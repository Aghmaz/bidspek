const Joi = require("joi");

const createUserSchema = (User) => {
  const schema = Joi.object().keys({
    //name: Joi.string().min(5).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    //role: Joi.string().required(),
    //date: Joi.date().required()
  });

  return schema.validate(User);
};

module.exports = createUserSchema;
