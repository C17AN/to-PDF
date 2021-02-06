import axios from "axios";
import { saveAs } from "file-saver";
import { useState } from "react";

function App() {
  const [data, setData] = useState({
    name: "",
    receiptId: 0,
    price1: 0,
    price2: 0,
  });

  const handleChange = ({ target: { value, name } }) => {
    setData({ ...data, [name]: value });
    console.log(name);
  };

  const createAndDownLoadPDF = () => {
    axios
      .post("http://localhost:5000/create-pdf", data)
      // blob : 불변의 raw 데이터 -> chunk of file
      .then(() =>
        axios.get("http://localhost:5000/fetch-pdf", { responseType: "blob" })
      )
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: "application/pdf" });
        saveAs(pdfBlob, "newPdf.pdf");
      });
  };

  return (
    <div className="App">
      <input
        type="text"
        placeholder="name"
        name="name"
        onChange={handleChange}
      ></input>
      <input
        type="number"
        placeholder="Receipt ID"
        name="receiptId"
        onChange={handleChange}
      ></input>
      <input
        type="number"
        placeholder="price 1"
        name="price1"
        onChange={handleChange}
      ></input>
      <input
        type="number"
        placeholder="price 2"
        name="price2"
        onChange={handleChange}
      ></input>
      <button onClick={createAndDownLoadPDF}>Download PDF</button>
    </div>
  );
}

export default App;
