const { User } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
    Query: {
        me: async (context) => {
            if (context.data) {
                const userData = await User.findOne({ _id: context.user._id }).select("-_v-password");
                return userData;
            }
            throw new AuthenticationError('Not logged in');
        },
    },

    Mutation: {
        addUser: async (parent, body) => {
            console.log({ body });
            const user = await User.create(body);
            console.log({ user });
            const token = signToken(user);

            return { token, user };
        },
        login: async (parent, body) => {
            const user = await User.findOne({
                email: body.email,
            });

            if (!user) {
                throw new AuthenticationError("No user with this email");
            }
            const correctPw = await user.isCorrectPassword(body.password);
            if (!correctPw) {
                throw new AuthenticationError("Incorrect password!");
            }

            const token = signToken(user);
            return { token, user };
        },
        saveBook: async (parent, { bookData }, context, { error }) => {
            if (context.user) {
                const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { savedBooks: bookData } },
                    { new: true, runValidators: true }
                );
                return updatedUser;
            } else {
                console.log(JSON.stringify(error));
            }
            throw new AuthenticationError("You need to be logged in!");
        },
        removeBook: async (parent, { bookId }, context) => {
            if (context.user) {
                return User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId: bookId } } },
                    { new: true }
                );
            }
            throw new AuthenticationError("You need to be logged in!");
        },
    },
};

module.exports = resolvers;

