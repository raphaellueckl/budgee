import {Component, ElementRef, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import * as d3 from 'd3';
import {SumPipe} from '../_pipes/sum.pipe';
import * as _ from 'underscore';

@Component({
  selector: 'app-pie-chart',
  styleUrls: ['./pie.component.scss'],
  templateUrl: 'pie.component.html'
})
export class PieComponent implements OnInit, OnChanges {

  @ViewChild('containerPieChart') chartContainer: ElementRef;
  @Input() data: any;
  @Input() colours: Array<string>;

  hostElement: any;
  svg: any;
  radius: number;
  innerRadius: number;
  outerRadius: number;
  htmlElement: HTMLElement;
  arcGenerator: any;
  arcHover: any;
  pieGenerator: any;
  path: any;
  values: Array<number>;
  labels: Array<string>;
  tooltip: any;
  centralLabel: any;
  pieColours: any;
  slices: Array<any>;
  selectedSlice: any;
  colourSlices: Array<string>;
  arc: any;
  arcEnter: any;

  constructor(
    private elRef: ElementRef
  ) {}

  createChart = () => {
    // chart configuration
    this.hostElement = this.chartContainer.nativeElement;

    this.radius = Math.min(this.hostElement.offsetWidth, this.hostElement.offsetHeight) / 2;
    const innerRadius = this.radius - 80;
    const outerRadius = this.radius - 15;
    const hoverRadius = this.radius - 5;
    this.pieColours = this.colours ? d3.scaleOrdinal().range(this.colours) : d3.scaleOrdinal(d3.schemeCategory20c);
    this.tooltip = this.elRef.nativeElement.querySelector('.tooltip');

    // create a pie generator and tell it where to get numeric values from and whether sorting is needed or not
    // this is just a function that will be called to obtain data prior binding that data to elements of the chart
    this.pieGenerator = d3.pie().sort(null).value((d: number) => d)([0, 0, 0]);

    // create an arc generator and configure it
    // this is just a function that will be called to obtain data prior binding that data to arc elements of the chart
    this.arcGenerator = d3.arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);

    this.arcHover = d3.arc()
      .innerRadius(innerRadius)
      .outerRadius(hoverRadius);

    // create svg element, configure dimentions and centre and add to DOM
    this.svg = d3.select(this.hostElement).append('svg')
      .attr('viewBox', '0, 0, ' + this.hostElement.offsetWidth + ', ' + this.hostElement.offsetHeight)
      .append('g')
      .attr('transform', `translate(${this.hostElement.offsetWidth / 2}, ${this.hostElement.offsetHeight / 2})`);
  };

  updateChart = (firstRun: boolean) => {
    const vm = this;

    this.slices = this.updateSlices(this.data);
    this.labels = this.slices.map(slice => slice.familyType);
    this.colourSlices = this.slices.map(slice => this.pieColours(slice.familyType));

    this.values = firstRun ? [0, 0, 0] : _.toArray(this.slices).map(slice => slice.amount);

    this.pieGenerator = d3.pie().sort(null).value((d: number) => d)(this.values);

    const arc = this.svg.selectAll('.arc')
      .data(this.pieGenerator);

    arc.exit().remove();

    const arcEnter = arc.enter().append('g')
      .attr('class', 'arc');

    arcEnter.append('path')
      .attr('d', this.arcGenerator)
      .each((values) => firstRun ? values.storedValues = values : null)
      .on('mouseover', this.mouseover)
      .on('mouseout', this.mouseout);

    // configure a transition to play on d elements of a path
    // whenever new values are passed in, the values and the previously stored values will be used
    // to compute the transition using interpolation
    d3.select(this.hostElement).selectAll('path')
      .data(this.pieGenerator)
      .attr('fill', (datum, index) => this.pieColours(this.labels[index]))
      .attr('d', this.arcGenerator)
      .transition()
      .duration(750)
      .attrTween('d', function(newValues, i){
        return vm.arcTween(newValues, i, this);
      });
  };

  arcTween(newValues, i, slice) {
    const interpolation = d3.interpolate(slice.storedValues, newValues);
    slice.storedValues = interpolation(0);

    return (t) => {
      return this.arcGenerator(interpolation(t));
    };
  }

  mouseover = (d, i) => {
    this.selectedSlice = this.slices[i];

    d3.select(d3.event.currentTarget).transition()
      .duration(200)
      .attr('d', this.arcHover);

    this.svg.append('text')
      .attr('dy', '-10px')
      .style('text-anchor', 'middle')
      .attr('class', 'label')
      .attr('fill', '#57a1c6')
      .text(this.labels[i]);

    this.svg.append('text')
      .attr('dy', '20px')
      .style('text-anchor', 'middle')
      .attr('class', 'percent')
      .attr('fill', '#57a1c6')
      .text(this.toPercent(this.values[i], new SumPipe().transform(this.values)));
  };

  mouseout = () => {
    this.svg.select('.label').remove();
    this.svg.select('.percent').remove();

    d3.select(d3.event.currentTarget).transition()
      .duration(100)
      .attr('d', this.arcGenerator);
  };

  toPercent = (a: number, b: number): string => {
    return Math.round( a / b * 100) + '%';
  };

  updateSlices = (newData: Array<any>): Array<any> => {
    const queriesByFamilyTypes = _.groupBy(_.sortBy(newData, 'familyType'), 'familyType');
    const results = [];

    Object.keys(queriesByFamilyTypes).map((familyType) => {
      results.push({
        familyType: familyType,
        amount: queriesByFamilyTypes[familyType].length,
        types: []
      });
    });

    results.map(result => {
      const queries = newData.filter(query => query.familyType === result.familyType);
      const queriesByTypes = _.groupBy(_.sortBy(queries, 'type'), 'type');

      Object.keys(queriesByTypes).map((type) => {
        result.types.push({
          type: type,
          amount: queriesByTypes[type].length,
        });
      });
    });

    return results;
  };

  ngOnInit() {
    // create chart and render
    this.createChart();

    // Initial update
    this.updateChart(true);

    // For animation purpose we load the real value after a second
    setTimeout(() => this.updateChart(false), 50);
  }

  ngOnChanges() {
    // update chart on data input value change
    if (this.svg) this.updateChart(false);
  }

}
