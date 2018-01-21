import * as express from "express"
import {resetDatabase} from "./utils/sql/database-reset";

const app = express()

const port = 8080

app.listen(this.port, (err) => {
    if (err) console.log(err)

    return console.log(`Server is listening on port ${port}`)
});
