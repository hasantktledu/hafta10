import { useEffect, useState } from "react";
import Ulke from "./Ulke";

function UlkeListe() {
  const [hata, hataGuncelle] = useState(null); //hata mesajı
  const [yukleniyor, yukleniyorGuncelle] = useState(true); //verilerin yüklenme durumu
  const [ulkeler, ulkeleriGuncelle] = useState([]); // asıl verilerimiz bu arrayde olacak

  // arama işlemleri için
  const [arama, aramaGuncelle] = useState("");
  const [aramaAlanlari] = useState(["capital", "name"]);

  const [filterParam, setFilterParam] = useState("Tümü");

  useEffect(() => {
    async function veriCek() {
      try {
        const yanit = await fetch("https://restcountries.com/v3.1/all");
        const JSObjesi = await yanit.json();

        ulkeleriGuncelle(JSObjesi);
        yukleniyorGuncelle(false);
      } catch (hata) {
        hataGuncelle(hata.message);
      }
    }

    setTimeout(veriCek, 2000); // @TODO gerçek appte veriCek() doğrudan çalıştırılacak
  }, []);

  function filtrele(ulkeler) {
    return ulkeler.filter((item) => {
      if (filterParam !== "Tümü") if (item.region !== filterParam) return;

      // eğer herhangi bir kıta seçildiyse veya tümü seçildiye ⏬

      const aranan = arama.toLowerCase();

      if (item.name?.common.toLowerCase().includes(aranan)) return true;

      if (item.name?.official.toLowerCase().includes(aranan)) return true;

      const ulkeKisaltma = item.cca3.toLowerCase();
      //console.log(ulkeKisaltma);

      if (
        item.name["nativeName"] &&
        item.name?.nativeName[ulkeKisaltma]?.official
          .toLowerCase()
          .includes(aranan)
      )
        return true;

      if (
        item.name["nativeName"] &&
        item.name?.nativeName[ulkeKisaltma]?.common
          .toLowerCase()
          .includes(aranan)
      )
        return true;

      return item.capital?.some((baskent) =>
        baskent.toLowerCase().includes(aranan)
      );
    });
  }

  if (hata) {
    return (
      <>
        <div className="alert alert-danger">{hata}</div>
      </>
    );
  }

  if (yukleniyor) {
    return <>Yükleniyor..</>;
  }

  const filtrelenmisUlkeler = filtrele(ulkeler);

  return (
    <>
      <h2>ÜLKE LİSTESİ</h2>
      <div className="row mb-4">
        <div className="col-6">
            <h3 className="h5">FİLTRELEME</h3>
          <div className="">
            <input
              value={arama}
              onChange={(e) => {
                aramaGuncelle(e.target.value);
              }}
              className="form-control"
              type="text"
              placeholder="Arama ifadesi.."
            />

            <select
              onChange={(e) => {
                setFilterParam(e.target.value);
              }}
              className="form-select"
              aria-label="Filter Countries By Region"
            >
              <option value="Tümü">Bölgelere Göre Filtrele</option>
              <option value="Africa">Africa</option>
              <option value="Americas">America</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europe</option>
              <option value="Oceania">Oceania</option>
            </select>
          </div>
        </div>

        <div className="col-6">
            <h3 className="h5">SIRALAMA</h3>
        </div>
      </div>
      Sayı: {filtrelenmisUlkeler.length}
      <div className="row g-3">
        {filtrelenmisUlkeler.map((ulke) => (
          <Ulke key={ulke.ccn3} ulkeVeri={ulke} />
        ))}
      </div>
    </>
  );
}

export default UlkeListe;
