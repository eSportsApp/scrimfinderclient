const axios = require("axios");
const WebSocket = require("ws");

class DiscordAPIClient {
  constructor(apiKey) {
    this.apiUrl = "http://localhost:3000";
    this.apiKey = apiKey;
    this.ws = null;
  }

  async connect() {
    try {
      this.ws = new WebSocket(`${this.apiUrl}?apiKey=${this.apiKey}`);

      this.ws.on("open", () => {
        console.log("Connected to WebSocket server");
      });

      this.ws.on("message", (data) => {
        const { action, message } = JSON.parse(data);
        if (action === "sendMessage") {
          console.log("Message received:", message);
        }
      });

      this.ws.on("close", () => {
        console.log("Disconnected from WebSocket server");
      });

      this.ws.on("error", (error) => {
        console.error("WebSocket error:", error);
      });
    } catch (error) {
      console.error("Error connecting to WebSocket server:", error);
    }
  }

  async sendData(action, message) {
    try {
      const response = await axios.post(
        `${this.apiUrl}/send-data`,
        { action, message },
        {
          headers: { Authorization: `Bearer ${this.apiKey}` },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error sending data:", error);
      throw error;
    }
  }
}

module.exports = ScrimfinderClient;
