import { usePeon } from '~/utils/peon';



export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  // return query.name.toLowerCase()
  const peon = await usePeon()

  const classes = await peon.playableClass()
  const firstSpec = classes.data.classes[0]
  const combination = []

  return Promise.all(classes.data.classes.map(async (cls: any) => {
    const playedClass = cls.name.toLowerCase().replace(" ", "-")



    const specs = await peon.playableClass({id: cls.id}); 

    const filenames = specs.data.specializations.map(async spec => {
      const specName = spec.name.toLowerCase().replace("%20", "-").replace(" ", "-")

      combination.push({
        name: `${spec.name} ${cls.name}`,
        filename: `${playedClass}_${specName}.json`,
        playedClass,
        specName
      })

      //  $fetch(`/api/bis?playedclass=${playedClass}&spec=${spec.name}&force=true`)

    })

    // combination.push({ class: cls, specs: filenames  });
    
    return combination
  }))
})