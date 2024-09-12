# Use the official Angular image as a parent image
FROM node:20.17.0 AS build

# Set the working directory inside the container
WORKDIR /usr/src/app

# # Set npm config to handle timeouts and retries
# RUN npm config set fetch-retries 5 && \
#     npm config set fetch-retry-mintimeout 20000 && \
#     npm config set fetch-retry-maxtimeout 120000


# # Set npm registry
# RUN npm config set registry https://registry.npmjs.org/

# Optionally update npm to the latest version
# RUN npm install -g npm@latest
# RUN npm install -g npm@latest

# Copy package.json and package-lock.json to the working directory
COPY user-app/package.json ./

# Clean npm cache and remove node_modules if any exist
RUN npm cache clean --force
RUN rm -rf node_modules

# Install Angular CLI
RUN npm install -g @angular/cli@18.2.1

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY user-app .

# Build the Angular app
# RUN ng build --configuration=production --output-path=dist/user-app

# # Use nginx as the base image
# FROM nginx:alpine

# # Copy the built Angular app to nginx html directory
# COPY --from=build /usr/src/app/dist/user-app /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# # Start nginx server
# CMD ["nginx", "-g", "daemon off;"]
CMD     ["ng", "serve"]