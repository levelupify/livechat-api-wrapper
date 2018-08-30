'use strict'

const request = require('request')

class LivechatAPIClient {

  /**
   * The constructor
   * @constructor
   * @param    {object} opts          Options for connecting to LiveChat
   * @property {string} opts.apiVersion The Api version to use in LiveChat (current version is 2 (as when this text is written))
   * @property {string} opts.username The LOGIN value used for authentication with LiveChat
   * @property {string} opts.password The API_KEY used for authentication with LiveChat
   * @property {string} opts.baseUrl  The base url to connect with LiveChat (default: https://api.livechatinc.com/)
   * @property {boolean} opts.debug  If you want to put the module into debug mode
   */
  constructor (opts) {

    if (!opts.username || !opts.password) {
      throw new Error('Needs username and/or password to work')
    }

    this.apiVersion = opts.apiVersion || 2
    this.username = opts.username
    this.password = opts.password
    this.baseUrl = opts.baseUrl || `https://api.livechatinc.com`
    this.debug = opts.debug || false
  }

  /**
   * Wrapper for making a request to the Vitec API
   * @param  {string} endpoint Endpoint to make the request against
   * @param  {string} method   What kind of HTTP verb we use (GET, POST, PUT)
   * @param  {object} data     An object with the additional data to supply
   * @return {Promise}
   */
  _doRequest (endpoint, method, data) {
    method = method || 'GET'

    return new Promise((resolve, reject) => {

      let requestObject = {
        uri: `${this.baseUrl}/${endpoint}`,
        method: method,
        auth: {
          username: this.username,
          password: this.password,
        },
        headers: {
          'X-API-Version': this.apiVersion,
        }
      }

      if (method === 'POST' || method === 'PUT') {
        requestObject = Object.assign(requestObject, {body: data}, {json: true})
      }

      request(requestObject, (error, response, body) => {
        if (error) {
          reject(error)
        } else {
          if (!requestObject.json && response.headers['content-type'].indexOf('application/json') !== -1) {
            body = JSON.parse(body)

            if (body.errors)
              reject(body)

            resolve(body)
          } else {
            resolve(body)
          }
        }
      })
    })
  }

  /**
   * Get all agents
   * @return {array}                   An array of agent objects
   */
  async getAgents() {
    this.debug ? console.log('getting agents') : null
    return this._doRequest('agents', 'GET')
  }

  /**
   * Get all greetings
   * @return {array}                   An array of greeting objects
   */
  async getGreetings() {
    this.debug ? console.log('getting greetings') : null
    return this._doRequest('greetings', 'GET')
  }

  /**
   * Get a single greeting
   * @return {array}                   An greeting object
   */
  async getGreeting(id) {
    this.debug ? console.log(`getting greeting ${id}`): null

    if (!id) 
      return new Error('Greeting id missing')

    return this._doRequest(`greetings/${id}`, 'GET')
  }

  /**
   * Create a greeting
   * @return {object}                   An greeting object
   */
  async createGreeting(data) {
    this.debug ? console.log(`creating greeting ${data}`): null

    if (!data) 
      return new Error('Greeting data missing')

    return this._doRequest(`greetings`, 'POST', data)
  }

  /**
   * Delete a greeting
   * @return {object}                   an object with status
   */
  async deleteGreeting(id) {
    this.debug ? console.log(`deleting greeting ${id}`): null

    if (!id) 
      return new Error('Greeting id missing')

    return this._doRequest(`greetings/${id}`, 'DELETE')
  }
}

module.exports = exports = LivechatAPIClient