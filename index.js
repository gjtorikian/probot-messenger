const getConfig = require('probot-config')
const sendEmail = require('./lib/email')

module.exports = (robot) => {
  robot.on('push', async context => {
    const config = await getConfig(context, 'probot-messenger.yml')
    let addresses = []
    let sender = {
      name: 'Probot Messenger',
      address: 'probot-messenger@no-reply.com'
    }

    config.services.forEach((el) => {
      if (el.name === 'email') {
        addresses = el.addresses
        // Override sender, if provided
        sender = el.sender || sender
      }
    })

    if (addresses.length !== 0) {
      sendEmail(sender, addresses, context.payload)
    }
  })

  robot.on('repository.publicized', async context => {
    // Code was pushed to the repo, what should we do with it?
    robot.log(context)
  })
}
