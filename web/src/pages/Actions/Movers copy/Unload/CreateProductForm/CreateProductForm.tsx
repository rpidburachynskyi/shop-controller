import React, { useState } from "react";

import classes from "./CreateProductForm.module.scss";
import { Input, Button, Spin, Select } from "antd";
import { useFormik } from "formik";
import api from "../../../../../providers/api";
import { inject, observer } from "mobx-react";
import { ProductsStore } from "../../../../../mobx/products-store";
import Form from "../../../../../shared/Form";
import FormItem from "../../../../../shared/Form/FormItem";

interface Props {
	productsStore?: ProductsStore;
}

const CreateProductForm = ({ productsStore }: Props) => {
	const [loading, setLoading] = useState(false);
	const {
		values,
		errors,
		touched,
		setFieldValue,
		setFieldTouched,
		handleChange,
		handleBlur,
		handleSubmit,
		dirty,
		isValid,
	} = useFormik({
		initialValues: {
			category: "",
			name: "",
			description: "",
			price: "",
		},
		validate: ({ category, name, price }) => {
			const errors: any = {};

			if (category === "")
				errors.category = "Категорія продукту повинена бути вказана";

			return errors;
		},
		onSubmit: async ({ category, name }) => {
			setLoading(true);
			try {
				await productsStore!.createProduct(name, category);
			} catch (e) {
				console.log(e);
				JSON.stringify(e);
			}
			setLoading(false);
		},
	});

	return (
		<Spin spinning={loading}>
			<Form
				className={classes.form}
				obSubmit={(a) => {
					console.log(a);
				}}
			>
				<FormItem
					name="name"
					label="Ім'я"
					initialValue=""
					type="input"
					validate={(name) => {
						if (name === "")
							return "Назва продукту повинена бути вказана";
					}}
				/>
				<FormItem
					name="price"
					label="Ціна"
					initialValue=""
					type="input"
					validate={(price) => {
						if (price === "")
							return "Ціна продукту повинена бути вказана";
						else if (price[0] === "-")
							return "Ціна не можу бути від'ємною";
						else if (!/^\d+(\.\d+)?$/.test(price))
							return "Ціна має містити тільки цифри";
						else if (!/^\d+(\.\d{2})?$/.test(price))
							return "Після крапки може бути тільки дві цифри";
					}}
				/>
				<FormItem type="button" isSubmit={true} />
			</Form>
		</Spin>
	);
};

/**<Form.Item
					required={true}
					label="Категорія"
					help={touched.category && errors.category}
					validateStatus={
						touched.category && errors.category
							? "error"
							: "validating"
					}
				>
					<Select
						value={values.category}
						onChange={(value) => setFieldValue("category", value)}
						onBlur={() => setFieldTouched("category", true)}
					>
						{productsStore?.categories.map((c) => (
							<Select.Option value={c.id}>{c.name}</Select.Option>
						))}
					</Select>
				</Form.Item>
				<Form.Item
					required={true}
					label="Назва"
					help={touched.name && errors.name}
					validateStatus={
						touched.name && errors.name ? "error" : "validating"
					}
				>
					<Input
						name="name"
						value={values.name}
						onChange={handleChange}
						onBlur={handleBlur}
					/>
				</Form.Item>
				<Form.Item
					label="Опис"
					help={touched.description && errors.description}
					validateStatus={
						touched.description && errors.description
							? "error"
							: "validating"
					}
				>
					<Input
						multiple={true}
						name="description"
						value={values.description}
						onChange={handleChange}
						onBlur={handleBlur}
					/>
				</Form.Item>
				<Form.Item
					required={true}
					label="Ціна"
					help={touched.price && errors.price}
					validateStatus={
						touched.price && errors.price ? "error" : "validating"
					}
				>
					<Input
						name="price"
						value={values.price}
						onChange={handleChange}
						onBlur={handleBlur}
					/>
				</Form.Item>
				<Form.Item>
					<Button
						className={classes.submitButton}
						style={{ display: "block" }}
						type="primary"
						disabled={!dirty || !isValid}
						onClick={() => handleSubmit()}
					>
						Створити
					</Button>
				</Form.Item> */

export default inject("productsStore")(observer(CreateProductForm));
