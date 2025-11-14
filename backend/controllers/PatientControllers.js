const Patient = require("../model/PatientModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const { computeAgeFromDob } = require("../utiles/date");

exports.signupPatient = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingPatient = await Patient.findOne({ email });
    if (existingPatient) {
      return res.status(400).json({ message: "Patient already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newPatient = new Patient({
      name,
      email,
      password: hashedPassword,
    });

    await newPatient.save();
    res.status(201).json({
      message: "Patient registered successfully",
      patient: newPatient,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

exports.loginPatient = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    const patient = await Patient.findOne({ email });
    if (!patient) {
      return res.status(400).json({ message: "Patient not found" });
    }
    const token = jwt.sign({ id: patient._id }, process.env.JWT_SECRET1, {
      expiresIn: "48h",
    });

    const isMatch = await bcrypt.compare(password, patient.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 48 * 60 * 60 * 1000, // 48 hours
    });
    res.status(200).json({ message: "Login successful", patient, token });
  } catch (error) {}
};

exports.logoutPatient = async (req, res) => {
  // Since JWT is stateless, logout can be handled on the client side by deleting the token.
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  });
  res.status(200).json({ message: "Logout successful" });
};

exports.getProfile = async (req, res) => {
  const patientId = req.patient.id;
  try {
    const patient = await Patient.findById(patientId).select(
      "-password -googleId"
    );
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.status(200).json({ patient });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

exports.google = async (req, res, next) => {
  const userType = req.query.type || "patient";

  passport.authenticate("google", {
    scope: ["profile", "email"],
    state: userType,
    prompt: "select_account",
  })(req, res, next);
};

exports.googleCallback = async (req, res) => {
  try {
    const { user, type } = req.user;
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET1, {
      expiresIn: "48h",
    });
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
    const redirectUrl = `${frontendUrl}/auth/success?token=${token}&type=${type}&user=${encodeURIComponent(
      JSON.stringify({
        id: user._id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage,
      })
    )}`;x
    res.redirect(redirectUrl);
  } catch (error) {
    res.redirect(
      `${process.env.FRONTEND_URL}/auth/error?message=${encodeURIComponent(
        e.message
      )}`
    );
  }
};
exports.failure = async (req, res) => {
  res.status(401).json({ message: "Authentication failed" });
}


exports.updatePatientOnboarding=async(req,res)=>{
  const patientId=req.patient.id;
  const updated={...req.body};

  try {
    if(updated.dob){
      updated.dob=computeAgeFromDob(updated,dob);
    }
    delete updated.password;

    updated.isVerified=true;
    const patient=await Patient.findByIdAndUpdate(patientId,updated,{new:true}).select('-password -googleId');
    if(!patient){
      return res.status(404).json({message:"Patient not found"});
    }
    res.status(200).json({message:"Patient onboarding updated successfully", patient})
  } catch (error) {
    res.status(500).json({message:"Internal server error", error});
    
  }
}