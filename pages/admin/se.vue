<template>
  <v-row>
    <Head>
      <Title v-if="countdownTimer">
        {{ countdownTimer }} - {{ ahMonitor }}
      </Title>
      <Title>
        {{ ahMonitor }}
      </Title>
    </Head>
    <v-col>
      <v-btn @click="loadShopping">Aktualisieren</v-btn>
      <v-btn @click="startPollingWithRandomInterval">Auto Reload</v-btn>
      <v-btn @click="copyList">Kopieren</v-btn>
      {{ Kopiert }}
    </v-col>
    <v-col>{{ countdownTimer }}</v-col>
  </v-row>
  <v-row>
      <v-col v-for="(item, index) in shoppinglist" :key="index" cols="12" lg="3">
        <v-card>
          <v-card-title>{{ item.name }}</v-card-title>
          <v-card-text>
            <div>Average Price: {{ item.avg_price }}</div>
            <div>Sales Per Day: {{ item.sales_per_day }}</div>
            <div class="mb-5 ">Sales Per Hour: {{ item.sales_per_hour }}</div>
            <div>
              <div v-for="(level, idx) in item.flip_price_levels" :key="idx" class="mb-2">
                <div class="d-flex mb-1 justify-space-between" justify="space-around">
                  <span>Flip Price Level:</span>
                  <b>From: {{ level.listing_price_level.from_price_level }}</b>
                  <b>To: {{ level.listing_price_level.to_price_level }}</b>
                </div>
                

                <div>Total Price: {{ level.total_price }}</div>
              </div>

              <div class="d-flex mb-2 justify-space-between" justify="space-around">
                <span>Max Sane Flip Level:</span>
                <span class="d-block">From: {{ item.max_sane_flip_level.listing_price_level.from_price_level }}</span>
                <span class="d-block">To: {{ item.max_sane_flip_level.listing_price_level.to_price_level }}</span>
              </div>P



              <div>Cost to Level: {{ item.max_sane_flip_level.cost_to_level }}</div>
              <div>Cost to Next Level: {{ item.max_sane_flip_level.cost_to_next_level }}</div>
            </div>
            {{ item.above_avg }}

            

          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  
</template>
<script setup>
  const shoppinglist = ref()
  const loadShopping = async () => {
    const result = await $fetch('/api/se')
    shoppinglist.value = result
  }

  
  const timeRemaining = ref(null);
  const Kopiert = ref()
  const previousData = ref(null);
  const countdownTimer = ref(null)
  const ahMonitor = ref("Peon AH Monitor")
  const newDataAvailable =ref(false)

  let intervalId = null;
  let countdownIntervalId = null;



  const intoShoppingList = computed(() => {
    if (shoppinglist.value == undefined) return "";
    let shoppingListString = "Temp";
    const json = shoppinglist.value;

    json.map(row => {
      // dummy^"imbued silkweave"^"Adamant Scales"^"Adamant Scales";;0;0;0;0;0;0;0;0;;3;;
      // Split the string based on "---"
      const parts = row["name"].split('---');

      // Extract the trimmed part before "---"
      const name = parts[0].trim();

      // Extract the number at the end after removing "Quality" and whitespace
      let quality = "";
      
      if (parts[1] != undefined) {
        quality = parts[1].replace(/\s*Quality\s*/g, '').trim();
      }

      shoppingListString += `^"${name}";;0;0;0;0;0;0;0;0;;${quality};;`;
    })

    return shoppingListString;
  } )

  const copyList = () => {
    const textToCopy = intoShoppingList.value
    navigator.clipboard.writeText(textToCopy)
    .then(() => {
      // Optional: Provide feedback to the user that the text has been copied
      console.log("Text copied to clipboard:", textToCopy);
      Kopiert.value = "Kopiert!"
    })
    .catch(err => {
      // Handle any errors that may occur
      console.error('Could not copy text: ', err);
      Kopiert.value = "Fehler :("

    });
    newDataAvailable.value = false
  }



  const startPollingWithRandomInterval = () => {
    const randomInterval = getRandomInterval();
    clearInterval(countdownIntervalId);
    timeRemaining.value = randomInterval / 1000
    intervalId = setTimeout(monitor, randomInterval);
    startTicking();
  };

  const stopPolling = () => {
    clearInterval(intervalId);
  };

  const getRandomInterval = () => {
    // Generate a random interval between 15 seconds and 15 minutes (900000 milliseconds)
    return Math.floor(Math.random() * (900000 - 15000) + 15000);
  };
  const monitor = async () => {
    try {
      await loadShopping()
      const newData = shoppinglist.value
      if (!previousData.value) {
        previousData.value = newData;
        return
      }

      // Compare newData with previousData to detect changes
      if (JSON.stringify(newData) !== JSON.stringify(previousData.value)) {
        // Trigger browser notification
        showBrowserNotification('New data available!');
        newDataAvailable.value = true
      }

      previousData.value = newData;
      startPollingWithRandomInterval(); 
    } catch (error) {
      console.error('Error fetching data:', error);
      startPollingWithRandomInterval(); 
    }
  };

  const startTicking = () => {
    // Update timeRemaining every second
    countdownIntervalId = setInterval(() => {
      timeRemaining.value -= 1;
      countdownTimer.value = formatTime(timeRemaining.value)

      if (newDataAvailable.value == true) {
        if ((Math.floor(timeRemaining.value) % 4) == 0) {
          ahMonitor.value = ""
        } else {
          ahMonitor.value = "Neue Daten!"
        }
      } else {
        ahMonitor.value = "Peon AH Monitor"
      }


      
      if (timeRemaining.value <= 1.5) {
        clearInterval(countdownIntervalId);
      }
    }, 1000);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const showBrowserNotification = (message) => {
    if (!("Notification" in window)) {
      alert("This browser does not support system notifications");
    } else if (Notification.permission === "granted") {
      // If it's okay let's create a notification
      new Notification(message);
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function(permission) {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
          new Notification(message);
        }
      });
    }
  };

  onMounted(() => {
    loadShopping();
  })

  onBeforeUnmount(() => {
    // Clean up resources when the component is unmounted
    stopPolling();
  });
</script>