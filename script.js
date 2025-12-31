// ambil semua hadis
fetch("https://sheetdb.io/api/v1/05oc6xnvsq1hc")
  .then(res => res.json())
  .then(data => {
    console.log("SEMUA HADIS:", data);
  })
  .catch(err => console.error(err));

  // ambil hadis yang berdasarkan id nya
  function getHadisById(idHadis) {
  return fetch(`https://sheetdb.io/api/v1/05oc6xnvsq1hc/search?id_hadis=${idHadis}`)
    .then(res => res.json())
    .then(data => {
      if (data.length === 0) {
        throw new Error("Hadis tidak ditemukan");
      }
      return data[0];
    });
}

// konsep ma'anil hadis
function mapMaanilHadis(row) {
  return {
    hadis: {
      id: row.id_hadis,
      sumber: `${row.kitab} No. ${row.nomor_hadis}`,
      teks_arab: row.teks_arab,
      terjemah: row.terjemah,
      tema: row.tema
    },
    lafaz_penting: row.lafaz
      ? row.lafaz.split("|").map(l => l.trim())
      : [],
    maanil_hadis: row.maanil || "",
    konteks_hadis: row.konteks || ""
  };
}
// fugsi utama (hadis lengkap dengan ma'anilnya)

async function getHadisLengkap(idHadis) {
  try {
    const row = await getHadisById(idHadis);
    const hasil = mapMaanilHadis(row);
    console.log("DATA HADIS LENGKAP:", hasil);
    return hasil;
  } catch (error) {
    console.error(error.message);
  }
}

