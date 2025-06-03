ROM node AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
FROM builder AS deploy
RUN useradd -m -d /home/nodeuser nodeuser
RUN mkdir -p /usr/src/app /home/nodeuser/.npm \
 && chown -R nodeuser:nodeuser /usr/src/app /home/nodeuser
WORKDIR /usr/src/app
COPY --chown=nodeuser:nodeuser --from=builder /usr/src/app .
USER nodeuser
EXPOSE 8080
CMD [ "npm", "start" ]
