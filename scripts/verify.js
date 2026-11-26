
require("dotenv").config();
const mongoose = require("mongoose");

const WorkoutPlan = require("../src/models/WorkoutPlan");
const WorkoutSession = require("../src/models/WorkoutSession");

async function verify() {
  await mongoose.connect(process.env.MONGODB_URI);

  await WorkoutPlan.init();
  await WorkoutSession.init();

  const planIndexes = await WorkoutPlan.collection.indexes();
  const sessionIndexes = await WorkoutSession.collection.indexes();

  console.log("WorkoutPlan indexes:", planIndexes);
  console.log("WorkoutSession indexes:", sessionIndexes);

  console.log(
    "Plan index:",
    planIndexes.some(i =>
      i.key.coachId === 1 && i.key.status === 1
    )
  );

  console.log(
    "Session index:",
    sessionIndexes.some(i =>
      i.key.clientId === 1 && i.key.completedAt === -1
    )
  );

  await mongoose.disconnect();
}

verify().catch(console.error);
