import { Component, HostListener, ViewChild } from '@angular/core';
import {MdbTableDirective} from 'angular-bootstrap-md';

@Component({
  selector: 'app-tablesearch',
  templateUrl: './tablesearch.component.html',
  styleUrls: ['./tablesearch.component.scss']
})
export class TablesearchComponent {

  @ViewChild(MdbTableDirective, {static: true}) mdbTable: MdbTableDirective;
    elements: any = [];
    headElements = ['ID', 'Category'];
    searchText: string = '';
    previous: string;

  constructor() { }

  @HostListener('input') oninput() {
    this.searchItems();
  }

  ngOnInit() {
    this.testFetch().then(data => {
      for (let i = 1; i <= data.length; i++) {
        this.elements.push({
            id: i.toString(), category: data[i-1]
        });
      }
      this.mdbTable.setDataSource(this.elements);
      this.previous = this.mdbTable.getDataSource();
    });
  }

  async testFetch() {
    const response = await fetch('https://api.publicapis.org/categories ');
    const data = await response.json();
    return data;
  }

  searchItems() {
    const prev = this.mdbTable.getDataSource();
    if (!this.searchText) {
        this.mdbTable.setDataSource(this.previous);
        this.elements = this.mdbTable.getDataSource();
    }
    if (this.searchText) {
        this.elements = this.mdbTable.searchLocalDataByFields(this.searchText, ['category']);
        this.mdbTable.setDataSource(prev);
    }
  }
}
