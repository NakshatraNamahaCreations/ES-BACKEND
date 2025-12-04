const TeamMembers = require("../../Model/Peoples/team");

class Team {
  async addTeamMember(req, res) {
    try {
      const {
        name,
        // phoneNumber,
        email,
        password,
        Courses,
        userapp,
        tryToBook,
        People,
        Payments,
        Chat,
        Pricing,
        Marketing,
        Paymentkey,
        Coupon,
       team,
Dashboard,
      } = req.body;
      const newTeamMember = new TeamMembers({
        name,
        // phoneNumber,
        email,
        password,
        Courses,
        userapp,
        tryToBook,
        People,
        Payments,
        Chat,
        Pricing,
        Marketing,
        Paymentkey,
        Coupon,
        team,
Dashboard,
      });
      await newTeamMember.save();
      res.status(200).json({
        status: true,
        success: "Team Member Added",
        data: newTeamMember,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async loginTeamMember(req, res) {
    const { email, password } = req.body;
    try {
      if (!email || !password) {
        return res
          .status(400)
          .json({ error: "Email and password are required" });
      }

      const user = await TeamMembers.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Email does not match" });
      }
      if (user.password !== password) {
        return res.status(400).json({ message: "Incorrect password" });
      }
      // if (user.isBlocked === true) {
      //   return res.status(400).json({
      //     message: "Your account has been blocked by admin",
      //   });
      // }
      res.status(200).json({
        message: "Login Success",
        user: user,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }

  async getTeammember(req, res) {
    try {
      const teamMembers = await TeamMembers.findOne({ _id: req.params.id });
      if (teamMembers) {
        return res.status(200).json({
          status: true,
          data: teamMembers,
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: "Internal Server Error",
        error,
      });
    }
  }
  async getAllTeammember(req, res) {
    try {
      const allmembers = await TeamMembers.find();
      // if (allmembers.length > 0) {
      return res.status(200).json({
        status: true,
        data: allmembers,
      });
      // }
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: "Internal Server Error",
        error,
      });
    }
  }

  async updateMember(req, res) {
    try {
      const teamMemberId = req.params.id;
      const {
        name,
        phoneNumber,
        email,
        website,
        banner,
        Courses,
        userapp,
        tryToBook,
        People,
        Payments,
        Chat,
        Pricing,
        Marketing,
        Paymentkey,
        Coupon,
       team,
Dashboard,
      } = req.body;

      let teamMember = await TeamMembers.findOne({ _id: teamMemberId });
      if (!teamMember) {
        return res.status(404).json({
          status: 404,
          error: "Id not found",
        });
      }

      await TeamMembers.findOneAndUpdate(
        { _id: teamMemberId },
        {
          name,
          phoneNumber,
          email,
          website,
          banner,
          Courses,
          userapp,
          tryToBook,
          People,
          Payments,
          Chat,
          Pricing,
          Marketing,
          Paymentkey,
          Coupon,
         team,
Dashboard,
        },
        {
          new: true,
        }
      );
      console.log("teamMember", teamMember);
      res.status(200).json({
        status: true,
        success: "Updated",
        data: teamMember,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteTeammember(req, res) {
    try {
      const _id = req.params.id;
      const member = await TeamMembers.findByIdAndDelete(_id);
      if (!member) {
        return res
          .status(404)
          .json({ status: false, message: "Member not found" });
      }
      return res
        .status(200)
        .send({ status: true, success: "Member deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

const TeamController = new Team();
module.exports = TeamController;
