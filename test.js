import ai from '#start/ai'

(async () => {
  const resOne = await ai.processPlayerMessage('nakiri ikuti si ini')
  if (resOne.ok) {
    console.log(JSON.parse(resOne.content))
  }

  const resTwo = await ai.processPlayerMessage('si asep')
  if (resTwo.ok) {
    console.log(JSON.parse(resTwo.content))
  }
})()
