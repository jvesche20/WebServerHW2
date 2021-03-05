const User = require('../models/user');

const doActionThatMightFailValidation = require('../failValidation/failValidation');

exports.getUsers = async (request, response) => {
  // eslint-disable-next-line max-len
  await doActionThatMightFailValidation.doActionThatMightFailValidationExport(request, response, async () => {
    response.json(await User.find(request.query).select('-_id -__v'));
  });
};

exports.deleteUserSSN = async (request, response) => {
  // eslint-disable-next-line max-len
  await doActionThatMightFailValidation.doActionThatMightFailValidationExport(request, response, async () => {
    response.sendStatus((await User.deleteOne({
      ssn: request.params.ssn,
    })).deletedCount > 0 ? 200 : 404);
  });
};

exports.deleteUser = async (request, response) => {
  // eslint-disable-next-line max-len
  await doActionThatMightFailValidation.doActionThatMightFailValidationExport(request, response, async () => {
    response.sendStatus((await User.deleteMany(request.query)).deletedCount > 0 ? 200 : 404);
  });
};

exports.postUser = async (request, response) => {
  // eslint-disable-next-line max-len
  await doActionThatMightFailValidation.doActionThatMightFailValidationExport(request, response, async () => {
    await new User(request.body).save();
    response.sendStatus(201);
  });
};

exports.putUser = async (request, response) => {
  const { ssn } = request.params;
  const user = request.body;
  user.ssn = ssn;
  // eslint-disable-next-line max-len
  await doActionThatMightFailValidation.doActionThatMightFailValidationExport(request, response, async () => {
    await User.findOneAndReplace({ ssn }, user, {
      upsert: true,
    });
    response.sendStatus(200);
  });
};

exports.getUsersSSN = async (request, res) => {
  // eslint-disable-next-line max-len
  await doActionThatMightFailValidation.doActionThatMightFailValidationExport(request, res, async () => {
    const getResult = await User.findOne({ ssn: request.params.ssn }).select('-_id -__v');
    if (getResult != null) {
      res.json(getResult);
    } else {
      res.sendStatus(404);
    }
  });
};

exports.userPatch = async (request, response) => {
  const { ssn } = request.params;
  const user = request.body;
  delete user.ssn;
  // eslint-disable-next-line max-len
  await doActionThatMightFailValidation.doActionThatMightFailValidationExport(request, response, async () => {
    const patchRequest = await user
      .findOneAndUpdate({ ssn }, user, {
        new: true,
      })
      .select('-_id -__v');
    if (patchRequest != null) {
      response.json(patchRequest);
    } else {
      response.sendStatus(404);
    }
  });
};
