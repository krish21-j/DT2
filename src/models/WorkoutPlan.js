
const mongoose = require("mongoose");

const workoutPlanSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3
    },
    coachId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    goal: {
      type: String,
      enum: ["strength", "fat_loss", "endurance"],
      required: true
    },
    exercises: {
      type: [String],
      required: true
    },
    status: {
      type: String,
      enum: ["active", "completed"],
      default: "active"
    }
  },
  { timestamps: true }
);

// Index 1: Coach's plans by status
workoutPlanSchema.index({
  coachId: 1,
  status: 1
});

module.exports = mongoose.model(
  "WorkoutPlan",
  workoutPlanSchema
);
