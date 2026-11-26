
const mongoose = require("mongoose");

const workoutSessionSchema = new mongoose.Schema(
  {
    planId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "WorkoutPlan",
      required: true
    },
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    completedAt: {
      type: Date,
      default: Date.now
    },
    durationMinutes: {
      type: Number,
      required: true,
      min: 1
    },
    caloriesBurned: {
      type: Number,
      min: 0
    },
    notes: String
  },
  { timestamps: true }
);

// Index 2: Client's workout history
workoutSessionSchema.index({
  clientId: 1,
  completedAt: -1
});

module.exports = mongoose.model(
  "WorkoutSession",
  workoutSessionSchema
);
