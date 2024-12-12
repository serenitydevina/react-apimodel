import { useState } from "react"; // Import React hook `useState` untuk mengelola state dalam komponen
import axios from "axios"; //  untuk membuat HTTP request ke API

function App() { // Fungsi utama komponen App
  const [file, setFile] = useState(null); // State untuk menyimpan file yang diunggah pengguna
  const [prediction, setPrediction] = useState(null); // State untuk menyimpan hasil prediksi dari API

  const handleFileChange = (event) => { // Fungsi untuk menangani perubahan input file
    setFile(event.target.files[0]); // Mengambil file yang dipilih pengguna dan menyimpannya ke state `file`
  };

  const handleSubmit = async (event) => { // Fungsi untuk menangani form submit
    event.preventDefault(); // untuk mencegah reload halaman default pada form submit
    const formData = new FormData(); //untuk membuat instance FormData untuk mengirim file
    formData.append("file", file); // untuk menambahkan file ke dalam FormData dengan field name "file"

    try {
      const response = await axios.post( // Mengirim POST request ke API menggunakan Axios
        "https://web-production-3f5d9.up.railway.app/predict", // URL endpoint API railway untuk prediksi
        formData, // Mengirimkan data file sebagai body request
        {
          headers: {
            "Content-Type": "multipart/form-data", // untuk menentukan header untuk file upload
          },
        }
      );
      setPrediction(response.data); // untuk menyimpan hasil prediksi yang diterima dari API ke state `prediction`
    } catch (error) {
      console.error("Error uploading file:", error); // untuk menampilkan error jika ada masalah saat mengunggah file
    }
  };

  return ( 
    <div className="container"> {/*  untuk seluruh konten aplikasi */}
      <h1 className="mt-5">Upload Gambar dan Dapatkan Prediksi</h1>
      <form onSubmit={handleSubmit}> {/* Form untuk unggah file */}
        <div className="form-group"> {/* div untuk grup input form */}
          <label htmlFor="fileInput">Pilih Gambar</label>
          <input
            type="file" // Input untuk memilih file
            className="form-control" // Kelas Bootstrap untuk gaya input
            id="file" // ID untuk input file
            onChange={handleFileChange} // Event handler untuk perubahan file
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3"> 
          Unggah
        </button>
      </form>
      {prediction && ( // Jika prediksi tersedia, tampilkan hasilnya
        <div className="mt-5"> {/*  untuk membungkus ukuran/tampilan hasil prediksi */}
          <h3>Hasil Prediksi</h3> {/* Header untuk hasil prediksi */}
          <pre>{JSON.stringify(prediction, null, 2)}</pre> {/* Menampilkan hasil prediksi dalam format JSON */}
        </div>
      )}
    </div>
  );
}

export default App; // Ekspor komponen App agar dapat digunakan di file lain
