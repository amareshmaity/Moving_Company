# Use an official Node.js runtime as a parent image
FROM node:20.17.0 AS build

# Set the working directory inside the container
WORKDIR /usr/src/app

# Set npm config to handle timeouts and retries
# RUN npm config set fetch-retries 5 && \
#     npm config set fetch-retry-mintimeout 20000 && \
#     npm config set fetch-retry-maxtimeout 120000


# Set npm registry
# RUN npm config set registry https://registry.npmjs.org/

# Optionally update npm to the latest version
# RUN npm install -g npm@latest

# Install global dependencies
#RUN npm install -g node-gyp

# Copy package.json and package-lock.json to the working directory
COPY package.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Remove existing node_modules (if any) and rebuild bcrypt
# RUN rm -rf node_modules && npm install bcrypt && npm rebuild bcrypt --build-from-source

# Expose the port that the app runs on
EXPOSE 3000

# Command to run the application
CMD ["node", "server.js"]