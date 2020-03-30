import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Modal } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import colors from './Colors';
import tempData, { TempData } from './tempData';
import TodoList from './components/TodoList';
import AddListModal from './components/AddListModal';

interface AppProp {}
interface AppState {
  addToVisible: boolean;
}
export default class App extends Component<AppProp, AppState> {
  constructor(props: AppProp) {
    super(props);

    this.state = {
      addToVisible: false,
    };
  }

  toggleAddTodoModal() {
    this.setState({ addToVisible: !this.state.addToVisible });
  }

  renderList(list: TempData) {
    return <TodoList list={list} />;
  }

  render() {
    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          visible={this.state.addToVisible}
          onRequestClose={() => this.toggleAddTodoModal()}>
          <AddListModal closeModal={() => this.toggleAddTodoModal()} />
        </Modal>
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.divider} />
          <Text style={styles.title}>
            Todo <Text style={{ fontWeight: '300', color: colors.blue }}>Lists</Text>
          </Text>
          <View style={styles.divider} />
        </View>
        <View style={{ marginVertical: 48 }}>
          <TouchableOpacity style={styles.addList} onPress={() => this.toggleAddTodoModal()}>
            <AntDesign name="plus" size={16} color={colors.blue} />
          </TouchableOpacity>

          <Text style={styles.add}>Add List</Text>
        </View>
        <View style={{ height: 275, paddingLeft: 32 }}>
          <FlatList
            data={tempData}
            keyExtractor={item => item.name}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => this.renderList(item)}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    backgroundColor: colors.lightBlue,
    height: 1,
    flex: 1,
    alignSelf: 'center',
  },
  title: {
    fontSize: 38,
    fontWeight: '800',
    color: colors.black,
    paddingHorizontal: 64,
  },
  addList: {
    borderWidth: 2,
    borderColor: colors.lightBlue,
    borderRadius: 4,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  add: {
    color: colors.blue,
    fontWeight: '600',
    fontSize: 14,
    marginTop: 8,
  },
});
