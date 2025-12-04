const notification = require("../Model/Notifications/notification");
const { firebase } = require("../Firebase");

const sendNotificationForRegisterUser = async (fcmToken) => {
  const data = await notification.findOne({
    targetAudience: "When user signs up on app",
  });

  try {
    await firebase.messaging().send({
      token: fcmToken,
      notification: {
        title: data.notificationTitle,
        body: data.notificationDescription,
        image: `{http://localhost:8081/notification/${data.image}}`, //change to server link
      },
      data: {
        navigationId: "login",
        chatId: "12345",
      },
    });
    console.log(
      `Notification sent successfully to vendor with FCM token: ${data.token}`
    );
  } catch (error) {
    console.error(
      `Error sending notification to vendor with FCM token :`,
      error
    );
  }
};

const sendNotificationForCoursePurchasedUser = async (fcmToken) => {
  const data = await notification.findOne({
    targetAudience: "When user buys any course",
  });
  console.log("Notifications Status:", data);
  try {
    console.log("yogi adad");
    await firebase.messaging().send({
      token:
        "emBZN2uuSman_QKZC_eI5D:APA91bHtNfDR6WVPcyk0--yrGQwmsuC34t1tHJP5Ibtdxo9yw-dw7CL_ZDVf7S74yGFdm3-DC_e8IhJzezD0ulzOZ_634MyEEgXkZXNlnJFtzBl4v1l07MRSjxM4wE680M2RTetYmbAx",
      notification: {
        title: data.notificationTitle,
        body: data.notificationDescription,
        image: `{http://localhost:8081/notification/${data.image}}`, //change to server link
      },
      data: {
        navigationId: "login",
        chatId: "12345",
      },
    });
    console.log(
      `Notification sent successfully to vendor with FCM token: ${data.token}`
    );
  } catch (error) {
    console.error(
      `Error sending notification to vendor with FCM token :`,
      error
    );
  }
};

module.exports = {
  sendNotificationForRegisterUser,
  sendNotificationForCoursePurchasedUser,
};
