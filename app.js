const form = document.querySelector('#searchForm');
const res = document.querySelector('#resTable');
const cont = document.getElementById("allContaint");
var upd;

form.addEventListener('submit', (e)=> {
   
    e.preventDefault();
   
    const ctype = form.elements.coinType.value;
    cont.classList.add('mainClick');
    cont.classList.remove('main');   
    fetchPrice(ctype);

});

const fetchPrice= async(ctype) =>{
    const r = await axios.get(`https://api.coinstats.app/public/v1/coins/${ctype}?currency=USD`);
    // console.log(r.data.coin.price);
    showPrice(r.data.coin);
}

    const showPrice = (coinData) =>{
    const price =  coinData.price;
    const vol =  coinData.volume;
    const change =coinData.change; 
    const coin = coinData.name;
    const curr = 'USD';
    var col = "green";
    if(change<0){
        col = "red";
    }    

       // We are storing time separetly because all other element like price, volume, change, base, target are inside ticker except time 
    // const time = r.data.timestamp;
    res.innerHTML=` <tr class="bg-primary" style="color: white;">
    <tr>
    <td>
        Property
    </td>
    <td>
        Value
    </td>
</tr>
<tr>
<td>
    ${coin}
</td>
<td style="color:${col};"><span style="font-size; 1.3em;">${price}</span> ${curr}</td>
</tr>
<tr>
    <td>
    Volume (24hrs)
    </td>
    <td>${vol}</td>
</tr>
<tr>
    <td>
    Change (24hrs)
    </td>
    <td style="color:${col};">${change} ${curr}</td>
</tr>
`

 

    // We are inserting html code directly in javascript through innerHTML =`` inside id = result (h5) from index.html 
    // res.innerHTML = `${price}`;

    // upd = setTimeout(()=>fetchPrice(ctype),10000);

}
