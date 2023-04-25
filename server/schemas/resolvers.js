const { User } = require('../models');

const resolvers = {
    Query: {
        me: async(parent, args, context) => {
            if (context.user) {
                const user = await User.findOne({
                    _id: context.user._id,
                })
                return user;
            }
        }
    },
    Mutation: {
        addUser: async(parent, args) => {
            const user = await User.create(args)
            const token = signToken(user)

            return {
                user, token
            } 
        },
        logIn: async (parent, {email, password}) => {
            const user = await User.findOne({email})
            const checkedPassword = await user.isCorrectPassword(password)
            const token = signToken(user)
            return {token, user}
        } 
    }
}


module.exports = resolvers