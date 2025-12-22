import type { Request, Response } from "express";
import { asyncHandler } from "../../../shared/middleware/index.js";
import { TagsService } from "./tagsService.js";
import {
  createErrorResponse,
  createSuccessResponse,
} from "../../../shared/utils/index.js";

const tagsService = new TagsService();

export const createTag = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.userId;

  if (!userId) {
    return res.status(401).json(createErrorResponse("Unauthorized"));
  }

  const tag = await tagsService.createTag(userId, req.body);

  return res
    .status(201)
    .json(createSuccessResponse(tag, "Tag created successfully"));
});

export const getTags = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.userId;

  if (!userId) {
    return res.status(401).json(createErrorResponse("Unauthorized"));
  }

  const page = parseInt(req.query.page as string) || 1;
  const limit = Math.min(parseInt(req.query.limit as string) || 50, 100);
  const search = req.query.search as string;

  const result = await tagsService.getTagsByUser(page, limit, search, userId);

  return res.status(200).json(
    createSuccessResponse(
      {
        tags: result.tags,
        pagination: {
          page: result.page,
          limit,
          total: result.total,
          totalPages: result.totalPages,
        },
      },
      "Tags retrieved successfully"
    )
  );
});

export const getTagById = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  const { tagId } = req.params;

  if (!userId) {
    return res.status(401).json(createErrorResponse("Unauthorized"));
  }

  if (!tagId) {
    return res.status(400).json(createErrorResponse("tagId is required"));
  }

  const tag = await tagsService.getTagById(tagId, userId);

  return res
    .status(200)
    .json(createSuccessResponse(tag, "Tag retrieved successfully"));
});

export const validateTags = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json(createErrorResponse("Unauthorized"));
    }

    const { tagIds } = req.body;

    if (!tagIds) {
    return res.status(400).json(createErrorResponse("tagIds is required"));
    }

    const result = await tagsService.validateTags(tagIds, userId);

    return res
      .status(200)
      .json(createSuccessResponse(result, "Tags validated successfully"));
  }
);