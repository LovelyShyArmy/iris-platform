import UploadPDF from "./UploadPDF";

const [fileURL, setFileURL] = useState("");

<UploadPDF onUpload={url => setFileURL(url)} />

<input type="hidden" value={fileURL} name="fileURL" />
