const { BadRequestResponse, OkResponse } = require("express-http-response");
const db = require("../../db");
var base64ToFile = require("base64-to-file");

const fs = require("fs");
const path = require("path");
const createNotification = async (req, res, next) => {
  let {
    notificationTypeId,
    sroNO,
    subject,
    year,
    dated,
    law_or_statute_id,
    file,
  } = req.body || req.body.notification;

  if (
    !notificationTypeId ||
    !sroNO ||
    !subject ||
    !year ||
    !dated ||
    !law_or_statute_id ||
    !file
  ) {
    return res
      .status(403)
      .send(new BadRequestResponse("Please fill all the fields"));
  }

  subject = subject.replace(/'/g, "\\'");

  const _path = path.join(process.cwd(), "public", "uploads/");
  base64ToFile.convert(
    file,
    _path,
    ["jpg", "jpeg", "png", "pdf"],
    (_filePath) => {
      var pathname = new URL(_filePath).pathname;
      var filePath = pathname.split("\\").splice(-2).join("/");
      console.log(filePath);
      const query = `INSERT INTO notifications (notificationTypeId,sroNO,subject,year,dated,law_or_statute_id,file) VALUES ('${notificationTypeId}', '${sroNO}', '${subject}','${year}',  '${dated}', '${law_or_statute_id}','${filePath}')`;
      db.query(query, (err, result) => {
        if (err) {
          return res.send(new BadRequestResponse(err));
        }
        return res.send(new OkResponse("Notification created successfully"));
      });
    },
  );
};

const searchNotifications = (req, res) => {
  const { sroNO, year, notificationTypeId, subject, dated, law_or_statute_id } =
    req.body || req.body.notification;

  console.log(req.body);
  let search = `SELECT * FROM notifications WHERE `;
  if (sroNO) {
    search += `sroNO LIKE '%${sroNO}%' OR `;
  }
  if (year) {
    search += `year LIKE '%${year}%' OR `;
  }
  if (notificationTypeId) {
    search += `notificationTypeId LIKE '%${notificationTypeId}%' OR `;
  }
  if (subject) {
    search += `subject LIKE '%${subject}%' OR `;
  }
  if (dated) {
    search += `dated LIKE '%${dated}%' OR `;
  }
  if (law_or_statute_id) {
    search += `law_or_statute_id LIKE '%${law_or_statute_id}%'`;
  }

  console.log(search);
  search = search.trim();
  if (search.includes("OR") && search.endsWith("OR")) {
    search = search.split("OR").slice(0, -1).join(" OR ");
  }
  if (!search.includes("LIKE")) {
    return res
      .status(422)
      .send(
        new BadRequestResponse("Please pass at least one search parameter"),
      );
  }
  console.log("-result---", search);
  db.query(search, (err, result) => {
    if (err) {
      return res.send(new BadRequestResponse(err));
    }
    return res.send(new OkResponse(result));
  });
};

const createNotificationType = (req, res) => {
  let { notificationCategoryName } = req.body || req.body.notificationType;

  if (!notificationCategoryName) {
    return res.send(new BadRequestResponse("Please fill all the fields"));
  }
  notificationCategoryName = notificationCategoryName.replace(/'/g, "\\'");
  const query = `INSERT INTO notificationtypes (notificationCategoryName) VALUES ('${notificationCategoryName}')`;

  db.query(query, (err, result) => {
    if (err) {
      return res.send(new BadRequestResponse(err));
    }
    return res.send(new OkResponse("Notification type created successfully"));
  });
};

const getNotificationTypes = (req, res) => {
  const query = `SELECT * FROM notificationtypes`;
  db.query(query, (err, result) => {
    if (err) {
      return res.send(new BadRequestResponse(err));
    }
    return res.send(new OkResponse(result));
  });
};

const getAllNotifications = (req, res) => {
  const query = `SELECT notifications.*,statutes.law_or_statute, notificationtypes.notificationCategoryName
   FROM notifications 
   LEFT JOIN 
   statutes ON notifications.law_or_statute_id = statutes.id
    LEFT JOIN
    notificationtypes ON notifications.notificationTypeId = notificationtypes.id`;
  db.query(query, (err, result) => {
    if (err) {
      return res.send(new BadRequestResponse(err));
    }
    if (result.length) {
      for (let notification of result) {
        // notification.file = new Buffer(notification.file, "binary").toString(
        //   "base64",
        // );
        notification.dated = new Date(notification.dated).toLocaleDateString();
      }
    }
    return res.send(new OkResponse(result));
  });
};

const deleteNotificationTypeById = (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM notificationtypes WHERE id = ${id}`;
  db.query(query, (err, result) => {
    if (err) {
      return res.send(new BadRequestResponse(err));
    }
    return res.send(new OkResponse("Notification type deleted successfully"));
  });
};
module.exports = {
  createNotification,
  searchNotifications,
  createNotificationType,
  getNotificationTypes,
  getAllNotifications,
  deleteNotificationTypeById,
};
