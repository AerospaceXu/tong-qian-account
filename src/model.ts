const localStorageRecordListKeyName = 'recordList';
const localStorageTagsListKeyName = 'tagsList';

interface TagData {
  id: string
  name: string
}

interface TagsListModel {
  data: TagData[]
  fetch: () => TagData[]
  save: () => void
  create: (name: string) => string
  update: (id: string, name: string) => void
  remove: (id: string) => void
}

export const recordListModel = {
  fetch(): RecordItem[] {
    return JSON.parse(
      window.localStorage.getItem(localStorageRecordListKeyName) || '[]'
    );
  },
  save(data: RecordItem[]) {
    window.localStorage.setItem(
      localStorageRecordListKeyName,
      JSON.stringify(data)
    );
  }
};

export const tagsListModel: TagsListModel = {
  data: [],
  fetch() {
    this.data = JSON.parse(
      window.localStorage.getItem(localStorageTagsListKeyName) || '[]'
    );
    return this.data;
  },
  save() {
    window.localStorage.setItem(
      localStorageTagsListKeyName,
      JSON.stringify(this.data)
    );
  },
  create(name) {
    const names = this.data.map(item => item.name);
    if (names.indexOf(name) !== -1) {
      throw new Error('duplicated');
    }
    this.data.push({
      id: name,
      name
    });
    this.save();
    return name;
  },
  update(id, name) {
    const idList = this.data.map(item => item.id);
    if (idList.indexOf(id) !== -1) {
      const names = this.data.map((item => item.name));
      if (names.indexOf(name) !== -1) {
        console.log(names);
        console.log(name);
        throw new Error('Repeat');
      } else {
        const target = this.data.filter(item => item.id === id)[0];
        target.name = name;
        target.id = name;
        this.save();
      }
    } else {
      throw new Error('NotFound');
    }
  },
  remove(id) {
    this.data = this.data.filter(item => item.id !== id);
    this.save();
  }
};