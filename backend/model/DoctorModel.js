const mongoose = require("mongoose");
const { healthcareCategoriesList } = require("../utiles/doctors");

const dailyTimeRangeSchema = new mongoose.Schema(
  {
    start: { type: String, required: true }, // "09:00"
    end: { type: String, required: true }, // "17:00"
  },
  { _id: false }
);

const availabilitySchema = new mongoose.Schema(
  {
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    daysOfWeek: { type: [Number], default: [] },
  },
  { _id: false }
);

const DoctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    googleId: { type: String, unique: true, sparse: true },
    profileImage: { type: String, default: "" },

    specialization: {
      type: String,
      enum: [
        "Cardiologist",
        "Dermatologist",
        "Orthopedic",
        "Pediatrician",
        "Neurologist",
        "Gynecologist",
        "General Physician",
        "ENT Specialist",
        "Psychiatrist",
        "Ophthalmologist",
      ],
    },

    category: { type: String, enum: healthcareCategoriesList, required: false },
    qualifications: { type: String, default: "" },
    experience: { type: Number, default: 0 }, // in years
    bio: { type: String, default: "" },

    hospitalInfo: {
      name: { type: String, default: "" },
      address: { type: String, default: "" },
      phone: { type: String, default: "" },
    },

    availabilityRange: availabilitySchema,
    dailyTimeRange: dailyTimeRangeSchema,
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Doctor", DoctorSchema);
