import pubsub from "./pubsub";

const run = () => {
 setInterval(() => {
   const time = new Date().toString();
   console.log('time: ', time);
    pubsub.publish("TIME_PUBLISH", {
      timePublish: time
    });
 }, 5000);
}

run()