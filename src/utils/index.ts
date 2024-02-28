export function CSVFileReader (fileObj:any, validatorFunc:Function) {
    const fileExt = fileObj.raw.name && fileObj.raw.name.split('.').pop()
    if (fileExt !== 'csv') return false
    const reader = new window.FileReader()
    return new Promise(resolve => {
      reader.onerror = () => {
        reader.abort()
        console.error('Problem parsing input file.')
      }
      reader.onload = async () => {
        try {
          const isValid = validatorFunc(reader.result)
          return resolve(isValid)
        } catch (error) {
          return resolve(false)
        }
      }
      reader.readAsText(fileObj.raw)
    })
  }