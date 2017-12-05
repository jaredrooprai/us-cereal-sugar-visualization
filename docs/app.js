var init =0;

(function() {


      d3.json("favourite.json", function (data)
      {
      var width = 600;
      var height = 600;

      var svg = d3.select("#chart")
        .append("svg")
        .attr("height", height)
        .attr("width", width)
        .append("g")
        .attr("transform", "translate(0,0)")

      var radiusScale = d3.scaleSqrt().domain([0, 12]).range([5,30])

      var simulation = d3.forceSimulation()
        .force("x", d3.forceX(width/2).strength(0.08))
        .force("y", d3.forceY(width/2).strength(0.08))
        .force("collide", d3.forceCollide(function(d){
          return (radiusScale(d.sugar) + 2)
        }))


      var circles = svg.selectAll(".State")
        .data(data)
        .enter().append("circle")
        .attr("class", function(d){
          return d.State;
        })
        .attr("r", function(d){
          return radiusScale(d.sugar)
        })
        .attr("fill", "lightblue")
        .attr("cx", 200)
        .attr("cy", 500)
        .on("mouseover", function(d){
          handleMouseOver(d);
        })
        .on("mouseout", function(d){
          handleMouseOut(d);

        })
        .on("mousemove", function(d){
          handleMouseMove(d);
        })

      simulation.nodes(data)
        .on("tick", ticked)

      function ticked() {
        circles
          .attr("cx", function(d){
            return d.x
          })
          .attr("cy", function(d){
            return d.y
          })
      }
      })
        function drawPie(s){
          var cat = s
          height = 300
          width = 500
          var radius = width / 4

          var color = d3.scaleOrdinal()
            .range(["#80CBC4", "#EF9A9A", "#FFE082"]);

          var arc = d3.arc()
            .outerRadius(radius - 10)
            .innerRadius(0);

          var labelArch = d3.arc()
            .outerRadius(radius - 50)
            .innerRadius(radius - 50);

          var pie = d3.pie()
            .sort(null)
            .value(function(d){
                return d[cat];
            });

          var svg = d3.select("#pie_chart")
            .append("svg")
            .attr("class", "hey")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + width/2 + "," + height/2 + ")");

      d3.csv("test.csv", function(error, data){
            var g = svg.selectAll(".arc")
              .data(pie(data))
              .enter().append('g')
              .attr("class", "arc");


            g.append("path")
              .attr("d", arc)
              .style("fill", function(d){
                return color(d.data[cat])
              })
              .transition()

            g.append("text")
              .attr("transform", function (d){
                return "translate(" + labelArch.centroid(d) + ")";
              })
              .attr("dy", ".50em")
              .text(function(d){
                return d.data[cat] + "%"
              })

        })
        function pieTween(b){
          b.innerRadius = 0;
          var i = d3.interpolate({startAngle: 0, endAngle:0}, b)
          return function (t) {return arc(i(t));};
        }

  }

var tooltip = d3.select("#chart")
    .append("div")
    .attr("class", "tooltip");

    tooltip.append("div")
        .attr("class", "label");


      tooltip.append("div")
        .attr("class","percent");

        tooltip.append("div")
          .attr("class","next");
          

function handleMouseOver(d){

  d3.selectAll("." + d.State).attr('fill', "black");
  d3.selectAll(".hey").remove()
  drawPie(d.State);
  tooltip.select(".label").html(d.State);
  tooltip.select(".percent").html("Popular Cereal: " + d.Favourite);
  tooltip.select(".next").html(d.Favourite + " Sugar content: " + d.sugar);
  tooltip.style("display","block");

}

function handleMouseOut(d){
  d3.selectAll("." + d.State).attr("fill", "lightblue")
}

function handleMouseMove(d){
  tooltip.style('top', (d3.event.layerY + 10) + 'px')
  .style('left', (d3.event.layerX + 10) + 'px');
}


})();
