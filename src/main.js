import { createApp, defineComponent } from 'vue';

const App = defineComponent({
  template: `
    <div id="app">
      <h1>Vue Pomodoro</h1>

      <form @submit.prevent="handleSubmit">
        <input v-model="title" placeholder="Enter Task" required />
        <button type="submit">Submit</button>
      </form>
    </div>

    <div style="width:100%; border: 1px solid #000; margin: 1rem 0; display: flex;">
      <div  style="width: 50%;  padding: 1rem;">
        <h2>Todo</h2>

        <ul style="padding: 0;">
          <li v-for="(item, index) in incompletedList" style="list-style: none;">
              <div>
                  <p>Title: {{item.title}}</p>
                  <p>Timer: {{formatTime(item.timer)}}</p>

                  <button type="button" @click="counter(index)" :disabled="timerActive">Start</button>
                  <button type="button" @click="pause" :disabled="!timerActive">Pause</button>
                  <button type="button" @click="done(index)">Done</button>
              </div>
          </li>
        </ul>
      </div>

      <div style="width: 50%; padding: 1rem;">
        <h2>Done</h2>
          <ul style="padding: 0;">
            <li v-for="item in completedList" style="list-style: none;">
                <div>
                  <p>Title: {{item.title}}</p>
                  <p>Timer: {{formatTime(item.timer)}}</p>
                </div>
            </li>
        </ul>
      </div>
    </div>
  `,
  data() {
    return {
      title: '',
      timerActive: false,
      incompletedList: [],
      completedList: [],
      intervalId: null
    };
  },
  methods: {
    done(index) {
      this.timerActive = false;
      clearInterval(this.intervalId);
      alert(`${this.incompletedList[index].title}'s task finished!`);
      this.completedList.push(this.incompletedList[index]);
      this.incompletedList.splice(index, 1);
    },
    pause() {
      this.timerActive = false;
      clearInterval(this.intervalId);
    },
    counter(index) {
      this.timerActive = true;
      this.intervalId = setInterval(() => {
        this.incompletedList[index].timer += 1;
      }, 1000);
    },
    handleSubmit() {
      const item = {
        title: this.title,
        timer: 0
      }
      this.incompletedList.push(item);
      this.title = ''
    },
    formatTime(minutes) {
      const hrs = Math.floor(minutes / 60);
      const mins = minutes % 60;

      const formattedHours = String(hrs).padStart(2, '0');
      const formattedMinutes = String(mins).padStart(2, '0');

      return `${formattedHours}:${formattedMinutes}`;
    }
  },
  watch: {
    incompletedList: {
      deep: true,
      handler(newValue) {
        for (let i = 0; i < newValue.length; i++) {
          const seconds = newValue[i].timer;

          if (seconds === 25) {
            this.done(i);
          }
        }
      }
    }
  }
});

createApp(App).mount('#app');