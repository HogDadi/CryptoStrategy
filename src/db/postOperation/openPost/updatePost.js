import { ref, update } from "firebase/database"
import { db } from "../../../../server/connect"
import getPost from "./getPost"

export default function UpdatePost(
  name,
  desc,
  newName,
  views,
  category,
  newsletter
) {
  console.log(newsletter)
  const fetch = async () => {
    const indicator = await getPost(name, category)
    const connect = ref(db, category)
    update(connect, {
      [newName]: {
        name: newName,
        createTime: indicator.createTime,
        description: desc,
        image: indicator.image,
        views: views,
        newsletter: newsletter,
      },
    })
    const updates = {}
    updates["/" + category + "/" + name] = null
    update(ref(db), updates)
  }
  if (name !== newName) {
    fetch()
  } else {
    const connect = ref(db, category + "/" + name)
    update(connect, {
      description: desc,
      views: views,
      newsletter: newsletter,
    })
  }
}
