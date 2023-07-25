export default class FetchData {
  constructor() {
    this.fetchData = this.fetchData.bind(this);
  }

  fetchData = async () => {
    const res = await fetch("https://ajax.test-danit.com/api/v2/cards", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const processedData = await res.json();
    return processedData;
  };
}
