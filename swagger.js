const m2s = require("mongoose-to-swagger");
const User = require("./db/user");
const { response } = require("express");
const { put, patch } = require("./routes/user-route");

exports.options = {
  components: {
    schemas: {
      User: m2s(User),
    },
  },
  openapi: "3.1.0",
  info: {
    version: "1.0.0",
    title: "CRUD API",
    description: "CV-App Project",
    contact: {
      name: "API Support",
      url: "http://www.example-cv-app.com",
    },
  },
  servers: [
    {
      url: "https://localhost:4200",
      description: "Local Server",
    },
  ],
  tags: [
    {
      name: "Users",
      description: "API endpoints for users",
    },
  ],
  paths: {
    "/api/users": {
      post: {
        tags: ["Users"],
        description: "Adds a new user to database.",
      },
    },
    "/api/users": {
      get: {
        tags: ["Users"],
        description: "Return all users",
        responses: {
          200: {
            description: "A list of users",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/User",
                  },
                },
              },
            },
          },
        },
      },
    },

    "/api/users/{username}": {
      get: {
        tags: ["Users"],
        parameters: [
          {
            name: "username",
            in: "path",
            required: true,
            description: "Username of user that we want to find.",
            type: "String",
          },
        ],
        description: "Get user with specific username",
        response: {
          200: {
            description: "User to find.",
            schema: {
              $ref: "#/components/schemas/User",
            },
          },
        },
      },
    },

    "/api/users/{username}": {
      post: {
        tags: ["Users"],
        parameters: [
          {
            name: "model",
            in: "path",
            required: true,
            description: "New registration",
            type: "User",
          },
        ],
        description: "Adds the new registration to database",
        response: {
          200: {
            schema: {
              $ref: "#/components/schemas/User",
            },
          },
        },
      },
      put: {
        tags: ["Users"],
        parameters: [
          {
            name: "username",
            in: "path",
            required: true,
            description: "Username of user that we want to find.",
            type: "String",
          },
          {
            name: "requestBody",
            in: "path",
            required: true,
            description:
              "New key and value to be added to User's registration.",
            type: "Array",
          },
        ],
      },
      patch: {
        tags: ["Users"],
        parameters: [
          {
            name: "username",
            in: "path",
            required: true,
            description: "Username of user that we want to find.",
            type: "String",
          },
          {
            name: "requestBody",
            in: "path",
            required: true,
            description: "New value to update User's registration.",
            type: "Array",
          },
        ],
      },
      delete: {
        tags: ["Users"],
        parameters: [
          {
            name: "username",
            in: "path",
            required: true,
            description: "Username of user that we want to find.",
            type: "String",
          },
        ],
      },
    },
  },
};
