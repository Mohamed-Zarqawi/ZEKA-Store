"use client";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  CreateProductSchema,
  ReqCreateProductType,
} from "@/types/admin/product";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useMedia } from "@/hooks/useMedia";
import { getChangedValues } from "@/utils/getChangedValues";
import { IconTrash } from "@tabler/icons-react";
import { Image, Pin } from "lucide-react";
import {
  useCreateAdminProduct,
  useGetAdminBrands,
  useGetAdminCategories,
  useGetAdminProducts,
} from "../products/hooks/useProducts";

const CreateProductPage = () => {
  const router = useRouter();

  interface PreviewImage {
    file: File;
    previewUrl: string;
  }

  const [selectedImages, setSelectedImages] = useState<PreviewImage[]>([]);

  const { mutateAsync: CreateProduct, isPending: isCreating } =
    useCreateAdminProduct();
  const { mutateAsync: uploadMedia, isPending: isMediaUploading } = useMedia();
  // ------------------ handle remove selected image -------------------

  const handleRemoveSelectedImage = (index: number) => {
    setSelectedImages((prev) => {
      const image = prev[index];
      URL.revokeObjectURL(image.previewUrl);
      return prev.filter((_, i) => i !== index);
    });
  };

  const { refetch: refetchProducts } = useGetAdminProducts();

  // ------------------- Categories and brands names -------------------

  const { data: categories } = useGetAdminCategories();
  const { data: brands } = useGetAdminBrands();
  type Option = {
    label: string;
    value: string;
  };

  const categoriesOptions: Option[] = Array.isArray(categories)
    ? categories.map((category: any) => ({
        label: category.name,
        value: category.id,
      }))
    : [];

  const brandsOptions: Option[] = Array.isArray(brands)
    ? brands.map((brand: any) => ({
        label: brand.name,
        value: brand.id,
      }))
    : [];

  const handleCreate = (data: ReqCreateProductType) => {
    CreateProduct(data).then(() => {
      toast.success("Product created successfully!", {});
      router.push("/admin/products");
      refetchProducts();
    });
  };

  // ------------------ handle main image -------------------
  const handleSetMainImage = (index: number) => {
    setSelectedImages((prev) => {
      const selectedImage = prev[index];
      return [selectedImage, ...prev.filter((_, i) => i !== index)];
    });
  };

  const {
    initialValues,
    dirty,
    values,
    errors,
    touched,
    handleSubmit,
    handleChange,
    setFieldValue,
    setFieldTouched,
  } = useFormik({
    initialValues: {
      name: "",
      description: "",
      price: 0,
      stock: 0,
      category_id: "",
      brand_id: "",
      images: [],
    },
    validationSchema: CreateProductSchema,
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

      selectedImages.forEach((image) => {
        URL.revokeObjectURL(image.previewUrl);
      });
      setSelectedImages([]);

      await handleCreate(changedValues);
    },
  });

  return (
    <div>
      <div className="text-primary text-3xl">CREATE PRODUCT</div>
      <div className="mt-10">
        <div className="flex w-full items-center justify-center">
          <form
            onSubmit={handleSubmit}
            className="flex h-fit w-full flex-col items-center justify-center gap-7"
            noValidate
          >
            {/* 1 */}
            <div className="flex flex-col items-center justify-center gap-4"></div>

            {/* 2 */}

            <div className="group flex w-full flex-col items-end justify-center gap-4">
              <Input
                name="name"
                type="text"
                label="Name"
                isRequired={true}
                errors={errors}
                touched={touched}
                value={values.name}
                onChange={handleChange}
                aria-invalid={!!errors.name && !!touched.name}
              />

              {/* ----------------------------------------------------- */}

              <Textarea
                name="description"
                label="Description"
                value={values.description}
                rows={4}
                onChange={handleChange}
                aria-invalid={!!errors.description && !!touched.description}
              />
              {errors.description && touched.description && (
                <FieldError>{errors.description}</FieldError>
              )}

              {/* ----------------------------------------------------- */}
              <div className="flex w-full gap-4">
                <Input
                  name="price"
                  type="number"
                  label="Price"
                  isRequired={true}
                  errors={errors}
                  touched={touched}
                  value={values.price}
                  onChange={handleChange}
                  aria-invalid={!!errors.price && !!touched.price}
                />

                {/* ----------------------------------------------------- */}

                <Input
                  name="stock"
                  type="number"
                  label="Stock"
                  isRequired={true}
                  errors={errors}
                  touched={touched}
                  value={values.stock}
                  onChange={handleChange}
                  aria-invalid={!!errors.stock && !!touched.stock}
                />
              </div>

              {/* ----------------------------------------------------- */}
              <div className="flex w-full gap-4">
                <Field>
                  <FieldLabel htmlFor="category">
                    Category<span className="text-destructive">*</span>
                  </FieldLabel>

                  <Select
                    value={values.category_id as any}
                    onValueChange={(value) =>
                      setFieldValue("category_id", Number(value))
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
                        {categoriesOptions.map((option, i: number) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  {errors.category_id && touched.category_id && (
                    <FieldError>{errors.category_id}</FieldError>
                  )}
                </Field>

                {/* ----------------------------------------------------- */}

                <Field>
                  <FieldLabel htmlFor="brand">
                    Brand<span className="text-destructive">*</span>
                  </FieldLabel>
                  <Select
                    value={values.brand_id as any}
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
                        {brandsOptions.map((option, i: number) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {errors.brand_id && touched.brand_id && (
                    <FieldError>{errors.brand_id}</FieldError>
                  )}
                </Field>
              </div>

              <div className="w-full">
                <div className="mb-2 w-full">Gallery Images</div>

                <div className="border-primary flex h-fit w-full flex-col rounded-lg border p-4">
                  {selectedImages.length > 0 ? (
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-[#A1A1A1]">
                        Selected Images ({selectedImages.length})
                      </div>

                      <div>
                        <Field className="w-35">
                          <Button
                            variant="outline"
                            className="border--[#A1A1A1]"
                            type="button"
                            asChild
                          >
                            <FieldLabel
                              htmlFor="image"
                              className="cursor-pointer"
                            >
                              Select Image
                            </FieldLabel>
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
                              setSelectedImages((prev) => [
                                ...prev,
                                ...newImages,
                              ]);
                              e.target.value = "";
                            }}
                          />
                        </Field>
                      </div>
                    </div>
                  ) : null}

                  {selectedImages.length > 0 ? (
                    <div className="flex w-full flex-col items-center justify-center gap-2 p-3">
                      {selectedImages.length > 0 && (
                        <div className="grid w-full grid-cols-5 gap-4">
                          {/* <FieldLabel className="w-full text-primary text-sm">
                              New photos to upload ({selectedImages.length})
                            </FieldLabel> */}
                          {selectedImages.map((image, index) => (
                            <div key={index} className="relative h-49 w-full">
                              <img
                                src={image.previewUrl}
                                className="aspect-square w-full rounded-md border object-cover"
                              />

                              <Button
                                type="button"
                                variant="outline"
                                size="rounded-icon-sm"
                                onClick={() => handleRemoveSelectedImage(index)}
                                className="border-border absolute top-2 right-2 cursor-pointer rounded-full border text-white hover:cursor-pointer"
                              >
                                <IconTrash className="text-destructive h-4 w-4 hover:cursor-pointer" />
                              </Button>

                              {index === 0 ? (
                                <Badge
                                  variant="outline"
                                  className="border-border absolute top-3 left-2 rounded-full border text-white"
                                >
                                  Main
                                </Badge>
                              ) : (
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="rounded-icon-sm"
                                  onClick={() => handleSetMainImage(index)}
                                  className="border-border absolute top-2 left-2 rounded-full border text-white"
                                >
                                  <Pin className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Image
                        className="h-12 w-12 text-[#A1A1A1]"
                        strokeWidth={1}
                      />
                      <div className="text-sm">Drop your image here</div>
                      <div className="text-xs text-[#A1A1A1]">
                        Accepts PNG, JPG, WebP
                      </div>

                      <div>
                        <Field className="w-35">
                          <Button
                            variant="outline"
                            className="border--[#A1A1A1]"
                            type="button"
                            asChild
                          >
                            <FieldLabel
                              htmlFor="image"
                              className="cursor-pointer"
                            >
                              Select Image
                            </FieldLabel>
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
                              setSelectedImages((prev) => [
                                ...prev,
                                ...newImages,
                              ]);
                              e.target.value = "";
                            }}
                          />
                        </Field>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 3 */}
            <div className="flex w-full flex-col items-center justify-center gap-4">
              <Button
                type="submit"
                isPending={isCreating || isMediaUploading}
                pendingText="Creating"
                disabled={!dirty || isCreating || isMediaUploading}
                className="h-12 w-full rounded-lg px-4 py-4 text-center font-extrabold transition-colors duration-300 hover:cursor-pointer"
              >
                CREATE PRODUCT
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProductPage;
