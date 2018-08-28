'use strict'

const assert = require('assert')
const config = require('config')
const chai = require('chai')
const expect = chai.expect
const should = chai.should()

const LiveChatAPIWrapper = require('../')
const LiveChatAPIClient = new LiveChatAPIWrapper(config.livechat)

describe('LiveChatAPIClient', function () {
  it('should be an object', function () {
    LiveChatAPIClient.should.be.an('object')
  })
})

describe('Check if endpoints are working', function () {

  describe('agents', () => {
    it('Should get all agents', async () => {
      const agents = await LiveChatAPIClient.getAgents()
      agents.should.be.an('array').that.is.not.empty
    })
  })

  describe('greetings', () => {

    it('Should get all greetings', async () => {
      const greetings = await LiveChatAPIClient.getGreetings()
      greetings.should.be.an('array').that.is.not.empty
    })

    it('Should create a greeting', async () => {
      const greeting = await LiveChatAPIClient.createGreeting({
        name: 'Test greeting', 
        rules: [
          {
            type: 'custom_variable', 
            'variable_name': 'test_var',
            "variable_value":"300",
            "operator":"contains"
          }
        ]
      })
      greeting.should.be.an('object').that.is.not.empty
    })

    it('Should delete the all test greetings', async () => {
      let greetings = await LiveChatAPIClient.getGreetings()
      greetings = greetings.filter(greeting => greeting.name === 'Test greeting')
      greetings.forEach(greeting => {

        describe('Delete test greetings', () => {
          it(`Deleting ${greeting.id}, ${greeting.name}`, async () => {
            const result = await LiveChatAPIClient.deleteGreeting(greeting.id)
            result.should.be.an('object')
            result.ok.should.be.true
          })
        })

      })
    })

  })
})