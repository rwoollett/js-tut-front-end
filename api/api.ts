import express from 'express';
import homepage from './homepage.json';
import { nanoid } from '@reduxjs/toolkit'
import { sentence, article } from 'txtgen'
import seedrandom from 'seedrandom'

let rng = seedrandom()

function getRandomInt(min:number, max:number) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(rng() * (max - min + 1)) + min
}

const randomFromArray = (array:string[]) => {
  const index = getRandomInt(0, array.length - 1)
  return array[index]
}

const notificationTemplates = [
  'poked you',
  'says hi!',
  `is glad we're friends`,
  'sent you a gift',
]


module.exports = {
  defineApi: function (app: express.Express) {

    app.get('/api/v1/homepage', function (req, res) {
      res.send(homepage.homepage);

    });

    app.post('/api/v1/posts', function (req, res) {
      res.send(
        {
          id: nanoid(),
          date: new Date(),
          title: req.body.post.title,
          content: req.body.post.content,
          user: req.body.post.user,
          reactions: {
            thumbsUp: 0,
            hooray: 0,
            heart: 0,
            rocket: 0,
            eyes: 0,
          },
        });

    });

    app.get('/api/v1/posts', function (req, res) {

      res.send(
        [
          {
            id: nanoid(),
            date: new Date(2021, 5, 12, 16, 30, 12),
            title: "Some tough spiders are thought of simply as figs",
            content: "Their bird was, in this moment, a silly bear. They were lost without the amicable kiwi that composed their fox. A peach is an amicable crocodile. A tidy fox without sharks is truly a scorpion of willing cats. Shouting with happiness, a currant is a wise currant!",
            user: "400",
            reactions: {
              thumbsUp: 0,
              hooray: 0,
              heart: 0,
              rocket: 0,
              eyes: 0,
            },
          },
          {
            id: nanoid(),
            date: new Date(2021, 5, 12, 16, 30, 12),
            title: "A horse can hardly be considered an efficient alligator without also being a rat!",
            content: "A grapes is the cranberry of a grapefruit; In ancient times the octopus is a persimmon. Few can name an enchanting fish that isn't a practical dog. A pear is a giraffe's grapes. A deer can hardly be considered a considerate fox without also being a chicken. As far as we can estimate, the kumquat of a panda becomes a decisive alligator? One cannot separate tangerines from forceful alligators?",
            user: "300",
            reactions: {
              thumbsUp: 0,
              hooray: 0,
              heart: 0,
              rocket: 0,
              eyes: 0,
            },
          },
          {
            id: nanoid(),
            date: new Date(2021, 5, 12, 16, 30, 12),
            title: sentence(),
            content: article(1),
            user: "300",
            reactions: {
              thumbsUp: 0,
              hooray: 0,
              heart: 0,
              rocket: 0,
              eyes: 0,
            },
          }
        ]);
    });

    app.get('/api/v1/users', function (req, res) {

      res.send(
        [
          {
            id: "400",
            name: "Mrs. Ryan Adamsh",
          },
          {
            id: "300",
            name: "Natalie Emard",
          }
        ]);
    });

    app.get('/api/v1/notifications', function (req, res) {

      const numNotifications = getRandomInt(1, 5)

      let pastDate

      const now = new Date()

      //if (req.query.since) {
      //  pastDate = parseISO(req.query.since)
      //} else {
        pastDate = new Date(now.valueOf())
        pastDate.setMinutes(pastDate.getMinutes() - 15)
      //}

      // Create N random notifications. We won't bother saving these
      // in the DB - just generate a new batch and return them.
      const notifications = [...Array(numNotifications)].map(() => {
        //const user = randomFromArray(schema.db.users)
        const template = randomFromArray(notificationTemplates)
        return {
          id: nanoid(),
          date: new Date(),
          message: template,
          user: "300",
          read: false,
          isNew: true,
        }
      })

      res.send(notifications);

    });

  }
}