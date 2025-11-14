const Doctor = require("../model/DoctorModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signupDoctor = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor) {
      return res.status(400).json({ message: "Doctor already exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newDoctor = new Doctor({
      name,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign({ id: newDoctor._id }, process.env.JWT_SECRET, {
      expiresIn: "48h",
    });

    await newDoctor.save();
    res
      .status(201)
      .json({
        message: "Doctor registered successfully",
        doctor: newDoctor,
        token,
      });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

exports.loginDoctor = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    const doctor = await Doctor.findOne({ email });
    if (!doctor) {
      return res.status(400).json({ message: "Doctor not found" });
    }
    const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET, {
      expiresIn: "48h",
    });

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 48 * 60 * 60 * 1000, // 48 hours
    });

    res.status(200).json({ message: "Login successful", doctor, token });
  } catch (error) {}
};

exports.logoutDoctor = async (req, res) => {
  // Since JWT is stateless, logout can be handled on the client side by deleting the token.
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  });
  res.status(200).json({ message: "Logout successful" });
};

exports.getProfile = async (req, res) => {
  const doctorId = req.doctor.id;
  try {
    const doctor = await Doctor.findById(doctorId).select(
      "-password -googleId"
    );
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.status(200).json({message: "Doctor profile fetched successfully", doctor });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

exports.listDoctors=async(req,res)=>{

  try {
    let {search,specialization,city,category,minFees,maxFees,sortBy,sortOrder,page,limit}=req.query;
    const filter={isVerified:true};

    if(specialization){
      filter.specialization={$regex: `^${specialization}$`, $options:'i'};
    }

    if(city){
      filter['hospitalInfo.city']={$regex:city,$options:'i'};
    }

    if(category){
      filter.category=category;
    }

    if(minFees || maxFees){
      filter.fees={};
      if(minFees) filter.fees.$gte=Number(minFees)
       if(maxFees) filter.fees.$lte=Number(maxFees)
    }

    if(search){
      filter.$or=[
        {name:{$regex:search,$options:'i'}},
        {specialization:{$regex:search,$options:'i'}},
        {'hospitalInfo.name':{$regex:search,$options:'i'}},
        {'hospitalInfo.city':{$regex:search,$options:'i'}}
      ]
    }

    const sort={[sortBy]:sortOrder==='asc'?1:-1};
    const skip=(Number(page)-1)*Number(limit)

    const [items,total]=await Promise.all([
      Doctor.find(filter).select('-password -googleId').sort(sort).skip(skip).limit(Number(limit)),
      Doctor.countDocuments(filter)
    ])
    
    res.status(200).json({message: "Doctors fetched successfully", items, pagination: {page:Number(page), limit:Number(limit),total:total}});

  } catch (error) {
    console.error('Doctor fetched failed',error);
    res.status(500).json({message: 'Internal server error', error});
    
  }
}



exports.updateOnboarding=async(req,res)=>{
  const doctorId=req.doctor.id;

  try {
    const updated={...req.body};
    delete updated.password;

    updated.isVerified=true;

    const doctor=await Doctor.findByIdAndUpdate(doctorId,updated,{new:true}).select('-password -googleId');
    res.status(200).json({message: "Doctor onboarding updated successfully", doctor});
    
  } catch (error) {
    res.status(500).json({message: "Internal server error", error});
  }
}
