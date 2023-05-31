package com.rest_api.fs14backend.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.UUID;

@NoArgsConstructor
@Data
public class ReturnDto {
    private UUID userId;
    private UUID bookCopyId;
}