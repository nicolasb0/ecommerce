# pull the official base image
FROM node:alpine AS development
# set working direction
WORKDIR /app
# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH
# install application dependencies
COPY frontend/package.json ./
COPY frontend/package-lock.json ./
RUN npm install
# add app
COPY frontend ./
# Expose port
EXPOSE 3000
# start app
CMD ["npm", "start"]