import React, { Component } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
  FlatList,
  KeyboardAvoidingView,
  TextInput,
  Keyboard,
  Platform,
} from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import colors from '../Colors';
import { TaskData } from '../models/TaskData';
import { Todo } from '../models/Todo';

interface TodoModalProp {
  list: TaskData;
  closeModal(): void;
  updateList(list: TaskData): void;
}

interface TodoModalState {
  newTodo: string;
}

export default class TodoModal extends Component<TodoModalProp, TodoModalState> {
  constructor(props: TodoModalProp) {
    super(props);

    this.state = {
      newTodo: '',
    };
  }

  toggleTodoCompleted(index: number) {
    const { list } = this.props;
    list.todos[index].completed = !list.todos[index].completed;
    this.props.updateList(list);
  }

  addTodo = () => {
    const { list } = this.props;
    list.todos.push({ title: this.state.newTodo, completed: false });
    this.props.updateList(list);
    this.setState({ newTodo: '' });
    Keyboard.dismiss();
  };

  renderTodo(todo: Todo, index: number) {
    return (
      <View style={styles.todoContainer}>
        <TouchableOpacity onPress={() => this.toggleTodoCompleted(index)}>
          <Ionicons
            name={todo.completed ? 'ios-square' : 'ios-square-outline'}
            size={24}
            color={colors.gray}
            style={{ width: 32 }}
          />
        </TouchableOpacity>
        <Text
          style={[
            styles.todo,
            {
              textDecorationLine: todo.completed ? 'line-through' : 'none',
              color: todo.completed ? colors.gray : colors.black,
            },
          ]}>
          {todo.title}
        </Text>
      </View>
    );
  }

  render() {
    const { list } = this.props;
    const taskCount = list.todos.length;
    const completedCount = list.todos.filter((todo) => todo.completed).length;
    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'android' ? undefined : 'padding'}>
        <SafeAreaView style={styles.container}>
          <TouchableOpacity
            style={{ position: 'absolute', top: 64, right: 32, zIndex: 10 }}
            onPress={this.props.closeModal}>
            <AntDesign name="close" size={24} color={colors.black} />
          </TouchableOpacity>
          <View style={[styles.section, styles.header, { borderBottomColor: list.color }]}>
            <View>
              <Text style={styles.title}>{list.name}</Text>
              <Text style={styles.taskCount}>
                {completedCount} of {taskCount} tasks
              </Text>
            </View>
          </View>
          <View style={[styles.section, { flex: 3 }]}>
            <FlatList
              data={list.todos}
              renderItem={({ item, index }) => this.renderTodo(item, index)}
              keyExtractor={(_, index) => index.toString()}
              contentContainerStyle={{ paddingHorizontal: 32, paddingVertical: 64 }}
              showsVerticalScrollIndicator={false}
            />
          </View>
          <View style={[styles.section, styles.footer]}>
            <TextInput
              style={[styles.input, { borderColor: list.color }]}
              onChangeText={(text) => this.setState({ newTodo: text })}
              value={this.state.newTodo}
            />
            <TouchableOpacity
              style={[styles.addTodo, { backgroundColor: list.color }]}
              onPress={() => this.addTodo()}>
              <AntDesign name="plus" size={16} color={colors.white} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    flex: 1,
    alignSelf: 'stretch',
  },
  header: {
    justifyContent: 'flex-end',
    marginLeft: 64,
    borderBottomWidth: 3,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: colors.black,
  },
  taskCount: {
    marginTop: 4,
    marginBottom: 16,
    color: colors.gray,
    fontWeight: '600',
  },
  footer: {
    paddingHorizontal: 32,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 48,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 6,
    marginRight: 8,
    paddingHorizontal: 8,
  },
  addTodo: {
    borderRadius: 4,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },

  todoContainer: {
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },

  todo: {
    color: colors.black,
    fontWeight: '700',
    fontSize: 16,
  },
});
