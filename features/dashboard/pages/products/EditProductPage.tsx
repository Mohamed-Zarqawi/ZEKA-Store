"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useFormik } from "formik";
import { Pin, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  useGetBrands_Admin,
  useGetCategories_Admin,
  useGetProduct_Admin,
  useUpdateProduct_Admin,
} from "./hooks/useProducts";

import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useMedia } from "@/hooks/useMedia";
import { UpdateProductSchema } from "@/types/admin/product";
import { ProductType } from "@/types/shop/product";
import { getChangedValues } from "@/utils/getChangedValues";
import { IconTrash } from "@tabler/icons-react";
import Image from "next/image";
import { useState } from "react";

interface EditProductPageProps {
  productId: string;
}
export type OptionsType = {
  name: string;
  id: string;
};
const EditProductPage = ({ productId }: EditProductPageProps) => {
  const router = useRouter();

  const { mutateAsync: updateProduct, isPending: isProductUpdating } =
    useUpdateProduct_Admin();

  const { mutateAsync: uploadMedia, isPending: isMediaUploading } = useMedia();
  const {
    data: product,
    isLoading: isProductLoading,
    refetch: refetchProduct,
  } = useGetProduct_Admin(productId);
  const { data: categories } = useGetCategories_Admin();
  const { data: brands } = useGetBrands_Admin();

  type Option = {
    label: string;
    value: string;
  };

  const categoriesOptions: Option[] = Array.isArray(categories)
    ? categories.map((category: OptionsType) => ({
        label: category.name,
        value: String(category.id),
      }))
    : [];

  const brandsOptions: Option[] = Array.isArray(brands)
    ? brands.map((brand: OptionsType) => ({
        label: brand.name,
        value: String(brand.id),
      }))
    : [];

  // ------------------ handle edit product -------------------

  const handleEditProduct = async (updatedData: Partial<ProductType>) => {
    if (!productId) return;

    if (updatedData.stock !== undefined)
      updatedData.stock = Number(updatedData.stock);
    await updateProduct({ productId, updatedData });
    await router.push("/dashboard/products");
  };

  interface PreviewImage {
    file: File;
    previewUrl: string;
  }
  const [selectedImages, setSelectedImages] = useState<PreviewImage[]>([]);

  // ------------------ handle remove selected image -------------------

  const handleRemoveSelectedImage = (index: number) => {
    setSelectedImages((prev) => {
      const image = prev[index];
      URL.revokeObjectURL(image.previewUrl);
      return prev.filter((_, i) => i !== index);
    });
  };

  // ------------------ handle main image -------------------

  const handleSetMainImage = (image: string) => {
    const newImagesOrder = [
      image,
      ...values.images.filter((img) => img !== image),
    ];

    setFieldValue("images", newImagesOrder);
  };

  // ------------------ handle remove image -------------------

  const handleRemoveImage = (image: string) => {
    const newImages = [...values.images.filter((img) => img !== image)];
    setFieldValue("images", newImages);
  };

  // ------------------ Formik -------------------

  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleChange,
    setFieldValue,
    initialValues,
    dirty,
    setFieldTouched,
  } = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: product?.name || "",
      description: product?.description || "",
      price: product?.price || 0,
      stock: product?.stock || 0,
      category_id: product?.category_id,
      brand_id: product?.brand_id,
      images: product?.images?.map((image) => image) || [],
    },
    validationSchema: UpdateProductSchema,
    onSubmit: async (values) => {
      let uploadedImages: string[] = [];

      if (selectedImages.length > 0) {
        const uploaded = await Promise.all(
          selectedImages.map((image) =>
            uploadMedia({
              file: image.file,
            }),
          ),
        );

        uploadedImages = uploaded.map((image) => image.url);
      }
      const updatedValues = {
        ...values,
        images: [...values.images, ...uploadedImages],
      };

      const changedValues = getChangedValues(updatedValues, initialValues);

      const supabaseValues = {
        ...changedValues,
      };

      if (changedValues.category !== undefined) {
        supabaseValues.category_id = Number(changedValues.category);
        delete supabaseValues.category;
      }

      if (changedValues.brand !== undefined) {
        supabaseValues.brand_id = Number(changedValues.brand);
        delete supabaseValues.brand;
      }

      await handleEditProduct(supabaseValues);

      selectedImages.forEach((image) => {
        URL.revokeObjectURL(image.previewUrl);
      });
      setSelectedImages([]);
      refetchProduct();
    },
  });

  const mainImage = values.images[0];

  return (
    product && (
      <div>
        <form onSubmit={handleSubmit}>
          {/* Header Bar */}
          <div className="flex items-center justify-between">
            <div className="text-primary text-3xl">Edit {product?.name}</div>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                router.push(`/dashboard/products/${product?.id}`);
              }}
            >
              View Mode
            </Button>
          </div>

          {/* Basic information */}
          <div className="border-primary mt-10 flex h-fit w-full flex-col rounded-3xl border bg-[#1a1a1a]/20 px-8 py-8 backdrop-blur-md">
            <div className="-semibold text-lg">Basic Information</div>
            <div className="mt-5 flex flex-wrap gap-6">
              <Field>
                <FieldLabel className="text-primary text-sm">ID</FieldLabel>
                <div className="text-muted-foreground">{product?.id}</div>
              </Field>

              <Input
                id="name"
                name="name"
                label="Name"
                isRequired={true}
                errors={errors}
                touched={touched}
                value={values.name}
                onChange={handleChange}
                className="w-full sm:w-96"
                aria-invalid={!!errors.name && !!touched.name}
              />

              <Textarea
                rows={4}
                id="description"
                name="description"
                label="Description"
                isRequired={false}
                errors={errors}
                touched={touched}
                value={values.description}
                onChange={handleChange}
                className="w-full sm:w-96"
                aria-invalid={!!errors.description && !!touched.description}
              />
            </div>
          </div>

          {/* Product details */}
          <div className="border-primary mt-6 flex h-fit w-full flex-col rounded-3xl border bg-[#1a1a1a]/20 px-8 py-8 backdrop-blur-md">
            <div className="-semibold text-lg">Product Details</div>
            <div className="mt-5 flex flex-wrap gap-6">
              <div className="flex w-full flex-col gap-4 sm:w-96">
                {/* Category */}
                <Field>
                  <FieldLabel className="text-primary text-sm">
                    Category<span className="text-destructive">*</span>
                  </FieldLabel>
                  <Select
                    key={`category-${values.category_id}`}
                    value={String(values.category_id)}
                    onValueChange={(value) =>
                      setFieldValue("category_id", value)
                    }
                    onOpenChange={(open) => {
                      if (!open) setFieldTouched("category", true);
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {categoriesOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {errors.category_id && touched.category_id && (
                    <FieldError>{String(errors.category_id)}</FieldError>
                  )}
                </Field>

                {/* Brand */}
                <Field>
                  <FieldLabel className="text-primary text-sm">
                    Brand<span className="text-destructive">*</span>
                  </FieldLabel>
                  <Select
                    key={`brand-${values.brand_id}`}
                    value={String(values.brand_id)}
                    onValueChange={(value) =>
                      setFieldValue("brand_id", Number(value))
                    }
                    onOpenChange={(open) => {
                      if (!open) setFieldTouched("brand_id", true);
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Brand" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {brandsOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {errors.brand_id && touched.brand_id && (
                    <FieldError>{String(errors.brand_id)}</FieldError>
                  )}
                </Field>

                {/* Price */}

                <Input
                  id="price"
                  name="price"
                  type="number"
                  label="Price"
                  isRequired={true}
                  errors={errors}
                  touched={touched}
                  onWheel={(e) => e.currentTarget.blur()}
                  value={values.price}
                  onChange={handleChange}
                  className="w-full"
                  aria-invalid={!!errors.price && !!touched.price}
                />

                {/* Stock */}

                <Input
                  id="stock"
                  name="stock"
                  type="number"
                  label="Stock"
                  onWheel={(e) => e.currentTarget.blur()}
                  isRequired={true}
                  errors={errors}
                  touched={touched}
                  value={values.stock}
                  onChange={handleChange}
                  className="w-full"
                  aria-invalid={!!errors.stock && !!touched.stock}
                />
              </div>
            </div>
          </div>

          {/* Product Photos */}
          <div className="border-primary mt-6 flex h-fit w-full flex-col rounded-3xl border bg-[#1a1a1a]/20 px-8 py-8 backdrop-blur-md">
            <div className="flex items-center justify-between">
              <div className="-semibold text-lg">Product Photos</div>
              <div>
                <Button variant="default" type="button" asChild>
                  <label htmlFor="image" className="cursor-pointer">
                    <Plus />
                    Add Photo
                  </label>
                </Button>

                <Input
                  type="file"
                  id="image"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => {
                    const files = Array.from(e.target.files || []);
                    if (files.length === 0) return;
                    const newImages = files.map((file) => ({
                      file,
                      previewUrl: URL.createObjectURL(file),
                    }));
                    setSelectedImages((prev) => [...prev, ...newImages]);
                    e.target.value = "";
                  }}
                />
              </div>
            </div>
            <div className="mt-5 flex flex-wrap gap-6">
              <Field>
                <FieldLabel className="text-primary mb-3 text-sm">
                  Main photo
                </FieldLabel>
                <div className="relative flex w-full max-w-2xl gap-8">
                  {values?.images?.length > 0 ? (
                    <Image
                      src={mainImage}
                      alt={`${product?.name} main photo`}
                      width={232}
                      height={232}
                      className="border-primary h-58 w-58 rounded-2xl border object-cover object-center"
                    />
                  ) : (
                    <div className="text-muted-foreground text-sm">
                      No photos
                    </div>
                  )}
                </div>
              </Field>

              <Field>
                <FieldLabel className="text-primary mb-2 text-sm">
                  Existing Photos
                  {values?.images?.length > 0 ? (
                    <div>({values?.images?.length})</div>
                  ) : null}
                </FieldLabel>
                <div className="flex flex-wrap gap-4">
                  {values?.images?.length > 0 ? (
                    product.images
                      ?.filter((image) => values.images.includes(image))
                      .map((image, i) => (
                        <div className="relative" key={i}>
                          <Image
                            src={image}
                            alt={product?.name}
                            width={128}
                            height={128}
                            className="border-primary h-32 w-32 rounded-2xl border object-cover object-center"
                          />

                          <Button
                            type="button"
                            variant="outline"
                            size="rounded-icon-sm"
                            onClick={() => handleRemoveImage(image)}
                            className="border-border text-foreground absolute top-2 right-2 cursor-pointer rounded-full border hover:cursor-pointer"
                          >
                            <IconTrash className="text-destructive h-4 w-4 hover:cursor-pointer" />
                          </Button>
                          {mainImage == image ? (
                            <Badge
                              variant="outline"
                              className="border-border text-foreground absolute top-3 left-2 cursor-pointer rounded-full border hover:cursor-pointer"
                            >
                              Main
                            </Badge>
                          ) : (
                            <Button
                              type="button"
                              variant="outline"
                              size={"rounded-icon-sm"}
                              onClick={() => handleSetMainImage(image)}
                              className="border-border text-foreground absolute top-2 left-2 cursor-pointer rounded-full border hover:cursor-pointer"
                            >
                              <Pin className="h-4 w-4 hover:cursor-pointer" />
                            </Button>
                          )}
                        </div>
                      ))
                  ) : (
                    <div className="text-muted-foreground text-sm">
                      No photos
                    </div>
                  )}
                </div>
              </Field>

              <div className="w-full">
                {selectedImages.length > 0 && (
                  <div className="border-primary/40 flex w-full flex-wrap gap-4 border-t pt-4">
                    <FieldLabel className="text-primary w-full text-sm">
                      New photos to upload ({selectedImages.length})
                    </FieldLabel>
                    {selectedImages.map((image, index) => (
                      <div key={index} className="relative h-32 w-32">
                        <Image
                          src={image.previewUrl}
                          alt="New product photo"
                          width={128}
                          height={128}
                          unoptimized
                          className="border-primary h-32 w-32 rounded-2xl border-2 border-dashed object-cover"
                        />

                        <Button
                          type="button"
                          variant="outline"
                          size="rounded-icon-sm"
                          onClick={() => handleRemoveSelectedImage(index)}
                          className="border-border text-foreground absolute top-2 right-2 cursor-pointer rounded-full border hover:cursor-pointer"
                        >
                          <IconTrash className="text-destructive h-4 w-4 hover:cursor-pointer" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex justify-end gap-3">
            <Button
              type="submit"
              variant="default"
              isPending={isProductUpdating || isMediaUploading}
              pendingText="Updating"
              disabled={
                (!dirty && selectedImages.length === 0) ||
                isProductUpdating ||
                isMediaUploading
              }
              className="rounded-lg p-6 text-base hover:cursor-pointer"
            >
              Update Product
            </Button>
          </div>
        </form>
      </div>
    )
  );
};

export default EditProductPage;
