var data;
await fetch("/data.json")
    .then((res) => res.json())
    .then((res) => {
        data = res
    });
// console.log(data);

var tableid, selfid, nodeid;
var nodes1 = [];
var edges1 = [];
var ir = 0;
var it = 0;

data.map(table => {
    tableid = it++;
    selfid = it++;
    nodes1.push({
        id: tableid,
        label: table.tableName,
        color: "red"
    });
    nodes1.push({
        id: selfid,
        label: `{${table.tableName}}`,
        color: "red"
    });
    edges1.push({ from: tableid, to: selfid })
    table.data.map((rows) => {
        Object.entries(rows).forEach(([key, value]) => {
            // console.log(`${key}: ${value}`)
            if(key === "self"){
                return
            }
            nodeid = it++;
            nodes1.push({
                id: nodeid, label: value, color: "lightgreen"
            })
            edges1.push({ from: tableid, to: nodeid })
            edges1.push({ from: selfid, to: nodeid })
        });
    })
})
// console.log(tables)

// create an array with nodes
var nodes = new vis.DataSet([
    { id: 1, label: "address", color: "red" },
    { id: 2, label: "doctor", color: "red" },
    { id: 3, label: "200 univ ave", color: "lightgreen" },
    { id: 4, label: "waterloo", color: "lightgreen" },
    { id: 5, label: "canada", color: "lightgreen" },
    { id: 6, label: "d101", color: "lightgreen" },
    { id: 7, label: "Dr henry jekyll", color: "lightgreen" },
    { id: 8, label: "{address}", color: "skyblue" },
    { id: 9, label: "{doctor}", color: "skyblue" },
]);

// create an array with edges
var edges = new vis.DataSet([
    { from: 1, to: 8 },
    { from: 2, to: 9 },
    { from: 1, to: 3 },
    { from: 1, to: 4 },
    { from: 1, to: 5 },
    { from: 8, to: 3 },
    { from: 8, to: 4 },
    { from: 8, to: 5 },
    { from: 2, to: 6 },
    { from: 2, to: 7 },
    { from: 2, to: 8 },
    { from: 9, to: 6 },
    { from: 9, to: 7 },
    { from: 9, to: 8 },
]);

// create a network
var container = document.getElementById("mynetwork");
var data = {
    nodes: nodes1,
    edges: edges1,
};
var options = {
    edges: {
        // shadow: true,
        smooth: true,
        background: false,
        background: {
            enabled: false,
            color: "#ff0000",
        },
        arrows: {
            to: {
                enabled: true,
            }
        }
    },
    nodes: {
        // margin: "circle"
        shape: "circle"
    }
};

var network = new vis.Network(container, data, options);
