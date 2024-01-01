<script setup >
const charName = ref("Echskalibur")
const realm = ref("Malorne")

const clearGear = target => {
  for (const key in target.value) {
  if (target.value.hasOwnProperty(key)) {
    target.value[key] = [];
  }
}
}
const mapGear = async (gearItem, target) => {
    if (gearItem.itemid == undefined) return;

    const bisGearItem = await useFetch(`/api/item/${gearItem.itemid}`)
    gearItem["inventory"] = bisGearItem.data.value.inventory_type;
    gearItem["wow"] = bisGearItem.data
    
    
    

    let type = bisGearItem.data.value.inventory_type.type
    if (target.value[type] == undefined) {
      target.value[type] = []
    }

    
    if (type == "HAND") {
      type = "HANDS"
    }

    if (type == "ROBE") {
      type = "CHEST"
    }

    if (type == "CLOAK") {
      type = "BACK"
    }

    target.value[type].push({
      name: bisGearItem.data?.value?.name,
      id: gearItem.itemid,
      raw: gearItem
    })
    

  }

const route = useRoute()

const char = ref({})
const charEquipArray = computed(() => {
  return Object.values(char.value) || []
})
const equip = ref({})

const skelleton = ref({
  "HEAD": [],
  "NECK": [],
  "SHOULDER": [],
  "SHIRT": [],
  "CHEST": [],
  "WAIST": [],
  "LEGS": [],
  "FEET": [],
  "WRIST": [],
  "HANDS": [],
  "FINGER": [],
  "FINGER_1": [],
  "FINGER_2": [],
  "TRINKET_1": [],
  "TRINKET_2": [],
  "BACK": [],
  "MAIN_HAND": [],
  "TABARD": [],
  "TRINKET": [],

})
const keysToExclude = ["FINGER_1", "FINGER_2", "TRINKET_1", "TRINKET_2", "CLOAK", "ROBE", "HAND"]
const displaySkeletton = computed(() => {
  return Object.entries(skelleton.value).reduce((acc, [key, value]) => {
  if (!keysToExclude.includes(key)) {
    acc[key] = value;
  }
  return acc;
}, {});
})

const bisGear = ref([])
const loadBis = async (playedClass, spec) => {
  try {
      progessStep.value = "Vergleiche mit wowhead-BiS-Gear"

      clearGear(skelleton)
      const bis = await useFetch(`/api/bis?playedclass=${playedClass.replace(" ", "-")}&spec=${spec.replace(" ", "-")}`)
      bisGear.value = bis.data
      bis.data.value?.map(async gearItem => mapGear(gearItem, skelleton))
  } finally {
    fetching.value = false
    progessStep.value = ""

  }

}

const charProfile = ref({})
const eqJson = ref({})
const fetching = ref(false)
const progessStep = ref("")
const reloadEquipmentJson = async() => {
  fetching.value = true
  progessStep.value = "Rufe Character-Daten ab"
  try {
      const res = await useFetch(`/api/char?name=${charName.value}&realm=${realm.value}`)
      // eqJson.value = res.data.value
      charProfile.value = res.data.value;
      res.data.value?.equipped_items?.map(async item => {
        const stuff = {
          'name': item?.name,
          'quality': item?.quality,
          'level': item?.level,
          'id': item?.item?.id,
    
        }
        eqJson.value[item.slot?.type] = stuff
        char.value[item.slot?.type] = stuff
    
        //mapGear(item, equip)
      })
      loadBis(charProfile.value?.character_class?.name, charProfile.value.active_spec?.name)
  } finally {
    // fetching.value = false
  }
}



const loadEquipment = async () => {
  const res = await useFetch("/equip/echskalibur.json", {
    cache: true,
    
  })
  console.log("char", res.data.value)
  
  char.value = res.data.value
 
  
 /*
  char.value.equipped_items.map(async item => {
    equip.value[item.slot?.type] = {
      'name': item?.name,
      'quality': item?.quality,
      'level': item?.level
    }
    //mapGear(item, equip)
  })
  */
  
 



}
const isWorn = (entry) => {
  return charEquipArray.value.findIndex(item => {
    // console.log(entry, item)
    
    return item.id == entry.id
  }) > -1
}

const isBis = (entry) => {
  const potentialBis = Object.values(skelleton.value) || []
  return potentialBis.findIndex(item => {
    console.log(entry, item)
    if (entry == undefined || item == undefined){
      return false
    }
    
    return item.id == entry.id
  }) > -1
}

/*
await reloadEquipmentJson()
await loadBis()
*/
</script>

<template>
  <div>


    <v-row>
      <v-col cols="4">
        <h1>{{ charProfile?.name }} ({{ charProfile.average_item_level }})</h1>
        <h2>{{ charProfile?.character_class?.name }} {{ charProfile?.active_spec?.name }}</h2>
      </v-col>
      <v-col class=" text-center">
        <div class="pa-5" v-if="fetching">
          <v-icon icon="mdi-account-convert" size="large"></v-icon><br>
          {{ progessStep}}

        </div>
      </v-col>
      <v-col cols="1">
        <v-text-field v-model="realm" siz></v-text-field>
        
      </v-col>
      <v-col  cols="1">
        <v-text-field v-model="charName"></v-text-field>

      </v-col>

      <v-col cols="auto">
        <v-btn @click="reloadEquipmentJson" class="mt-2" :append-icon="fetching ? 'mdi-account-convert' : 'mdi-account-search'">Load Equipment</v-btn>

      </v-col>

    </v-row>
    <!-- v-btn @click="loadBis">Load BiS</v-btn -->

   
    
    <v-row>

      <v-col cols="2" v-for="slot, name in displaySkeletton" >
        <v-card>
          <v-card-title>{{ name }} <span v-if="char[name]">({{ char[name]?.level.value }})</span></v-card-title>
          <v-card-text>
            <hr class="ma-5" />

            <p v-if="char[name]">
              {{ char[name]?.name }} ({{ char[name]?.level.value }})
            </p>
            <p v-else-if="name == 'FINGER'">
              {{ char['FINGER_1']?.name }} ({{ char['FINGER_1']?.level.value }})<br >
              {{ char['FINGER_2']?.name }} ({{ char['FINGER_2']?.level.value }})
            </p>
            <p v-else-if="name == 'TRINKET'">
              {{ char['TRINKET_1']?.name }} ({{ char['TRINKET_1']?.level.value }})<br>
              {{ char['TRINKET_2']?.name }} ({{ char['TRINKET_2']?.level.value }})
            </p>
            <hr class="ma-5" />
            <v-fade-transition  v-for="entry in slot" :key="entry.itemid">
              <v-sheet border rounded="lg" :class="{'bg-green-lighten-2': isWorn(entry)}" class="d-block pa-2 mb-2 ">
                <a variant="plain" :href="entry.raw.item_link" target="_blank" class="d-block text-subtitle-1 title">{{ entry?.raw.item }}</a>
                <a variant="plain" :href="entry.raw.source_link" target="_blank" class="d-block text-subtitle-2 title">{{ entry?.raw?.source }}</a>
                <p>{{ entry?.raw?.slot_tier }}</p>
              
              </v-sheet>  
            </v-fade-transition>
          </v-card-text>
        </v-card>
        <!-- v-row>
          <v-col cols="2">{{ name }}</v-col>
          <v-col :class="{'bg-green-lighten-2': isBis(char[name])}">
            <template v-if="char[name]">
              {{ char[name].name }} ({{ char[name].level.value }})
              
            </template>
            <template v-if="name == 'FINGER'">
              {{ char["FINGER_1"]?.name }} ({{ char["FINGER_1"]?.level.value }})<br>
              {{ char["FINGER_2"]?.name }} ({{ char["FINGER_2"]?.level.value }})<br>
              
            </template>

          </v-col>
          <v-col v-if="slot">
            
            <v-label :class="{'bg-green-lighten-2': isWorn(entry)}" class="d-block" v-for="entry in slot">{{ entry.name }}</v-label>  

          </v-col>
        </v-row -->
      </v-col>
    </v-row>
    
<!--    
    <v-row>
      <v-col cols="6">
        {{ char }}
          
      </v-col>
      <v-col col="6">
        
          {{  bisGear }}

       
      </v-col>
    </v-row>

    <v-row v-for="slot, name in skelleton">
      <v-col cols="1">{{ name }}</v-col>
      <v-col cols="2">{{ equip[name] }}</v-col>
      <v-col>
        <v-label class="d-block" :class="{ 'background-red': isWorn(entry) }" v-for="entry in slot">{{ entry.name }}</v-label>  
        
      </v-col>
    </v-row>
 -->  


    <h2> {{ char?.character?.name }}</h2>
    <pre>
      

    </pre>
    <!-- v-row v-for="item in char?.equipped_items">

      <v-col cols="2">{{ item?.slot?.type }} | {{ item?.slot?.name }} | {{ item?.item.id }}</v-col>
      <v-col cols="2">{{ item?.name }}</v-col>
      <v-col cols="2">{{ item?.level?.value }}</v-col>
      <v-col>
        <pre>{{ skelleton[item?.slot?.type] }}</pre> 
      </v-col>

    </v-row -->

  </div>
</template>
<style scoped>
  .title {
    word-wrap: break-word;
    color: #333;
    text-decoration: none;  
  }
</style>
