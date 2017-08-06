import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
//reduxForm is a function that could communicate between form and reducer
//http://redux-form.com/7.0.3/docs/GettingStarted.md/
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions/index';

class PostsNew extends Component {
    //只要用户有任意的事件发生，field都会validate，并且re-render
    renderField(field) {
        const { meta: {touched, error} } = field;
        const className = `form-group ${touched && error ? 'has-danger' : '' }`;

        //{...field.input} 获得所有事件？
        return (
            <div className={className}>
                <label>{field.label}</label>
                <input 
                    className="form-control"
                    type="text"
                    {...field.input}   
                />
                <div className="text-help">
                    {/* 页面刷新后就会出现此message，直到满足不报错条件 */}
                    {field.meta.touched ? field.meta.error : ''}
                    {/* if the user has touched the field show error, otherwise don't show error */}
                </div>
            </div>
        );
    }

    //确定没有error后才会调用!! marvallous!
    onSubmit(values) {
        this.props.createPost(values);
    }

    render() {
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={ handleSubmit(this.onSubmit.bind(this))} >
                <Field
                    label="Title" 
                    name="title"
                    component={this.renderField}
                />
                <Field 
                    label="Categories"
                    name="categories"
                    component={this.renderField}
                />
                <Field 
                    label="Post Content"
                    name="content"
                    component={this.renderField}
                />
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/" className="btn btn-danger">Cancel</Link>
            </form>
        );
    }
}

function validate(values) {
    const errors = {};

    //validate the input
    //"title" should be matched with Field name
    if(!values.title) {
        errors.title = "Enter a title!";
    }
    if(!values.categories) {
        errors.categories = "Enter a categories!";
    }
    if(!values.content) {
        errors.content = "Enter a content!";
    }

    //if errors is empty, the form is fine to submit
    //if errors has any properties, redux form assumes form is invalid
    return errors;
    //如果返回的errors中包含了title，那么title对应的那个Field会rerender
    //renderField会重新加载，error message就会显示出来了
}

export default reduxForm({
    //the form name needs to be unique
    validate,
    form: 'PostsNewForm'
})(
    connect(null, { createPost })(PostsNew)
);

