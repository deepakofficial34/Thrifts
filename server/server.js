const passport = require("passport");
const googleAuthRoutes = require("./routes/googleAuthRoutes");
require("./config/passport");

const app = express();
app.use(passport.initialize());
app.use("/api/auth", googleAuthRoutes);