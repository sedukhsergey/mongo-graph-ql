import {
  Args,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CategoryType } from './types/category.type';
import { CategoryService } from './category.service';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import PostsLoaders from '../post/posts.loaders';

@Resolver(() => CategoryType)
export class CategoryResolver {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly postsLoaders: PostsLoaders,
  ) {}

  @Query(() => [CategoryType], { name: 'categories' })
  categories() {
    return this.categoryService.findAll();
  }

  @Query(() => CategoryType, { name: 'category' })
  category(@Args('id', { type: () => ID }) id: string) {
    return this.categoryService.findOne(id);
  }

  @ResolveField()
  async posts(@Parent() category: CategoryType) {
    return this.postsLoaders.batchPostsByCategories.load(category.id);
  }

  @Mutation(() => CategoryType, { name: 'createCategory' })
  async createCategory(
    @Args('createCategoryInput') createCategoryInput: CreateCategoryInput,
  ) {
    return this.categoryService.create(createCategoryInput);
  }

  @Mutation(() => CategoryType, { name: 'updateCategory' })
  updateCategory(
    @Args('updateCategoryInput') updateCategoryInput: UpdateCategoryInput,
  ) {
    return this.categoryService.updatePartial(updateCategoryInput);
  }

  @Mutation(() => CategoryType, { name: 'deleteCategory' })
  deleteCategory(@Args('id', { type: () => ID }) id: string) {
    return this.categoryService.delete(id);
  }
}
