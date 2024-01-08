# Use an official Node.js runtime as a base image
FROM node:18 as build

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the application code to the container
COPY . .

# Build the React application
RUN npm run build

# Use a smaller, production-ready image for serving the application
FROM nginx:alpine

# Copy the build artifacts from the previous stage
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Copying our nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the port on which the nginx server will run
EXPOSE 80

# Start nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
